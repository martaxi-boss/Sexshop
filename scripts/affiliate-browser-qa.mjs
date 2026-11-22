import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';

const require=createRequire(import.meta.url);
const playwright=require(process.env.PLAYWRIGHT_MODULE);
const origin=process.env.SEVELORA_COMPAT_ORIGIN;
assert.ok(/^http:\/\/127\.0\.0\.1:\d+$/.test(origin||''),'Use local isolated test server');
const productId='34454438089';
const profiles=[
 {name:'desktop',viewport:{width:1366,height:900}},
 {name:'mobile',viewport:{width:390,height:844},hasTouch:true}
];
await mkdir('qa',{recursive:true});
let passes=0;
for(const engine of ['chromium','firefox','webkit']){
 const browser=await playwright[engine].launch({headless:true});
 try{
  for(const profile of profiles){
   const context=await browser.newContext({locale:'pt-PT',viewport:profile.viewport,hasTouch:!!profile.hasTouch});
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.route('https://www.awin1.com/**',route=>route.fulfill({status:200,contentType:'text/html; charset=utf-8',body:'<!doctype html><title>Simulacao de parceiro</title><h1>LINK_DE_COMPRA_INTERCEPTADO</h1>'}));
   for(const [path,selector] of [
    ['/catalogo','.real-product-card .product-card-actions a[href*="awin1.com/pclick.php"]'],
    ['/produto/'+productId,'.product-detail a[href*="awin1.com/pclick.php"]']
   ]){
    const response=await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:30000});
    assert.equal(response.status(),200,engine+' '+profile.name+' GET '+path);
    const link=page.locator(selector).first();
    await link.waitFor({state:'visible',timeout:20000});
    const href=await link.getAttribute('href');
    const target=await link.getAttribute('target');
    const rel=await link.getAttribute('rel');
    const url=new URL(href);
    assert.equal(url.protocol,'https:');
    assert.equal(url.hostname,'www.awin1.com');
    assert.equal(url.pathname,'/pclick.php');
    assert.equal(url.searchParams.get('a'),'3157353');
    assert.equal(url.searchParams.get('m'),'37722');
    assert.equal(url.searchParams.get('p'),productId);
    assert.ok(!target||target==='_self','must open in same tab, not popup');
    assert.ok(rel.includes('sponsored')&&rel.includes('nofollow'),'affiliate disclosure kept');
    if(profile.name==='mobile'&&path==='/catalogo'){
     const width=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
     assert.ok(width.scrollWidth<=width.viewport+2,engine+' mobile horizontal overflow: '+JSON.stringify(width));
    }
    if(path==='/catalogo')await page.screenshot({path:'qa/'+engine+'-'+profile.name+'-catalog.png'});
    await Promise.all([
     page.waitForURL(url=>url.hostname==='www.awin1.com',{timeout:15000}),
     link.click({timeout:15000})
    ]);
    assert.equal(context.pages().length,1,'affiliate navigation must keep one page');
    assert.ok((await page.locator('body').innerText()).includes('LINK_DE_COMPRA_INTERCEPTADO'),'intercepted destination should be shown');
    assert.deepEqual(errors,[],engine+' '+profile.name+' runtime errors');
    passes++;
    console.log('PASS '+engine+' '+profile.name+' '+path+' same-tab Awin link [redirect mocked; no external click]');
   }
   await context.close();
  }
 }finally{await browser.close()}
}
assert.equal(passes,12);
console.log('CROSS_BROWSER_AFFILIATE_QA_PASS=12/12');
