const {strict:assert}=require('node:assert');
const fs=require('node:fs');
const playwright=require(process.env.PLAYWRIGHT_MODULE);
const engine=process.env.TEST_ENGINE;
const origin='https://sevelora.eu';
const dir='evidence/'+engine;
fs.mkdirSync(dir,{recursive:true});
const report={engine,origin,realPublishedSite:true,startedAt:new Date().toISOString(),checks:[],errors:[],realMerchantTest:null};
let browser=null;
const add=(name,data)=>{report.checks.push({name,passed:true,...data});console.log('PASS '+engine+' '+name+' '+JSON.stringify(data||{}))};
const insist=(v,msg)=>{assert.ok(v,msg)};
const checkAwin=(raw)=>{
 const u=new URL(raw);
 assert.equal(u.protocol,'https:');
 assert.ok(['www.awin1.com','awin1.com'].includes(u.hostname),'unexpected affiliate host: '+u.hostname);
 assert.equal(u.pathname,'/pclick.php');
 assert.equal(u.searchParams.get('a'),'3157353');
 assert.equal(u.searchParams.get('m'),'37722');
 insist(/^\d+$/.test(u.searchParams.get('p')||''),'invalid product id in Awin url');
 return u;
};
const sleep=ms=>new Promise(ok=>setTimeout(ok,ms));
async function main(){
 const config={headless:true,timeout:30000};
 if(engine==='chromium'){config.executablePath=process.env.CHROME_BIN;config.args=['--no-sandbox','--disable-dev-shm-usage']}
 browser=await playwright[engine].launch(config);
 for(const profile of [{name:'desktop',viewport:{width:1366,height:900}},{name:'mobile',viewport:{width:390,height:844}}]){
  const context=await browser.newContext({locale:'pt-PT',viewport:profile.viewport,hasTouch:profile.name==='mobile'});
  try{
   const page=await context.newPage();
   const pageErrors=[];
   page.on('pageerror',err=>pageErrors.push(err.message));
   for(const path of ['/','/catalogo']){
    const res=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(res.status(),200,profile.name+' '+path+' HTTP');
    await page.locator('body').waitFor({state:'visible'});
    const dim=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
    insist(dim.scroll<=dim.viewport+3,profile.name+' '+path+' horizontal overflow: '+JSON.stringify(dim));
    insist((await page.title()).toLowerCase().includes('sevelora'),'Sevelora title absent');
    await page.screenshot({path:dir+'/'+profile.name+'-'+(path==='/'?'home':'catalog')+'.png',fullPage:false});
    add(profile.name+' '+path+' public load/viewport',{status:res.status(),...dim});
   }
   const cards=page.locator('.real-product-card');
   const total=await cards.count();
   insist(total>=1,profile.name+' real catalog is empty');
   const links=await page.locator('.real-product-card .product-card-actions a[href*="awin1.com/pclick.php"]').evaluateAll(nodes=>nodes.map(n=>({href:n.href,target:n.target,rel:n.rel})));
   insist(links.length>=1,'No live affiliate links');
   for(const l of links){checkAwin(l.href);insist(!l.target||l.target==='_self','Unexpected target '+l.target);insist(l.rel.includes('sponsored')&&l.rel.includes('nofollow'),'Missing affiliate rel')}
   add(profile.name+' real catalog Awin links',{visibleCards:total,validatedLinks:links.length});
   const search=page.locator('input[aria-label="Pesquisar produtos"]');
   await search.fill('naoexistexyz987654321');
   await page.locator('.results-label').filter({hasText:/0 produtos encontrados|0 produto encontrado/}).waitFor({timeout:10000});
   await search.fill('');
   await page.locator('.real-product-card').first().waitFor({state:'visible',timeout:10000});
   add(profile.name+' real search and clearing',{result:'zero then reset'});
   const href=await page.locator('.real-product-card h3 a[href^="/produto/"]').first().getAttribute('href');
   insist(/^\/produto\/\d+$/.test(href||''),'Product detail link missing');
   const product=href;
   const detail=await page.goto(origin+product,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(detail.status(),200,'product detail HTTP');
   const purchase=page.locator('.product-detail a[href*="awin1.com/pclick.php"]').first();
   await purchase.waitFor({state:'visible',timeout:15000});
   const actualHref=await purchase.getAttribute('href');
   const u=checkAwin(actualHref);
   insist((await purchase.getAttribute('target'))!=='_blank','detail tries popup');
   add(profile.name+' real product detail',{status:detail.status(),productId:u.searchParams.get('p')});
   await context.route('**/pclick.php?**',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:'<!doctype html><title>Afiliado interceptado</title><h1>AWIN_TEST_INTERCEPTED</h1>'}));
   await Promise.all([page.waitForURL(url=>url.hostname==='www.awin1.com',{timeout:15000}),purchase.click({timeout:15000})]);
   insist(context.pages().length===1,'Click created another window');
   insist((await page.locator('body').innerText()).includes('AWIN_TEST_INTERCEPTED'),'Browser did not actually navigate through link');
   add(profile.name+' actual browser click and same-tab navigation',{newWindows:0,destination:'www.awin1.com',externalCall:'intercepted for test'});
   insist(pageErrors.length===0,'JavaScript runtime error: '+pageErrors.join('; '));
   if(engine==='chromium' && profile.name==='desktop'){
    const externalPage=await context.newPage();
    const outbound={clicked:false,finalUrl:null,navigationStatus:null,error:null,host:null};
    try{
     await externalPage.goto(origin+product,{waitUntil:'domcontentloaded',timeout:25000});
     const external=externalPage.locator('.product-detail a[href*="awin1.com/pclick.php"]').first();
     await external.waitFor({state:'visible',timeout:15000});
     outbound.clicked=true;
     // ONE live external redirect: no form submission or purchase. Keep separate from mocked tests.
     await external.click({timeout:15000,noWaitAfter:true});
     await sleep(10000);
     outbound.finalUrl=externalPage.url().slice(0,500);
     outbound.host=new URL(externalPage.url()).hostname;
     outbound.navigationStatus=outbound.host==='www.diversual.com'||outbound.host==='diversual.com'?'merchant_reached':outbound.host==='www.awin1.com'?'awin_reached':'other';
    }catch(e){outbound.error=String(e).slice(0,300);outbound.finalUrl=externalPage.url().slice(0,500)}
    report.realMerchantTest=outbound;
    console.log('OBSERVE real merchant redirect '+JSON.stringify(outbound));
    await externalPage.close();
   }
  }finally{await context.close()}
 }
}
main().catch(e=>{report.errors.push(String(e?.stack||e));console.error('FAIL '+engine+' '+String(e?.stack||e));process.exitCode=1}).finally(async()=>{
 if(browser)await browser.close().catch(()=>{});
 report.endedAt=new Date().toISOString();report.allBrowserChecksPass=report.errors.length===0;
 fs.writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));
 if(report.errors.length)process.exitCode=1;
 console.log('REPORT '+engine+' '+JSON.stringify({passed:report.allBrowserChecksPass,checks:report.checks.length,merchant:report.realMerchantTest}));
});
