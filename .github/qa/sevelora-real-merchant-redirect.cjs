const assert=require('node:assert/strict');
const fs=require('node:fs');
const p=require(process.env.PLAYWRIGHT_MODULE);
const engine=process.env.TEST_ENGINE;
const origin='https://sevelora.eu';
const outfile='merchant-evidence/'+engine+'/result.json';
fs.mkdirSync('merchant-evidence/'+engine,{recursive:true});
const report={engine,start:new Date().toISOString(),origin,device:engine==='webkit'?'emulated iPhone 13 WebKit (Linux)':'Firefox desktop Linux',passes:[],failures:[],merchant:null};
const run=async()=>{
 const browser=await p[engine].launch({headless:true,timeout:30000});
 try{
  const opt=engine==='webkit'?{...p.devices['iPhone 13'],locale:'pt-PT'}:{locale:'pt-PT',viewport:{width:1366,height:900}};
  const context=await browser.newContext(opt);
  const page=await context.newPage();
  const requests=[];
  const pages=[];
  page.on('request',q=>{try{let u=new URL(q.url());if(['www.awin1.com','awin1.com','www.diversual.com'].includes(u.hostname))requests.push({host:u.hostname,pathname:u.pathname})}catch{}});
  page.on('response',q=>{try{let u=new URL(q.url());if(['www.awin1.com','awin1.com','www.diversual.com'].includes(u.hostname))pages.push({host:u.hostname,code:q.status()})}catch{}});
  const initial=await page.goto(origin+'/produto/43428124436',{waitUntil:'domcontentloaded',timeout:30000});
  assert.equal(initial.status(),200);
  const link=page.locator('.product-detail a[href*="awin1.com/pclick.php"]').first();
  await link.waitFor({state:'visible',timeout:15000});
  const original=await link.getAttribute('href');
  const href=new URL(original);
  assert.equal(href.hostname,'www.awin1.com');
  assert.equal(href.searchParams.get('a'),'3157353');
  assert.equal(href.searchParams.get('m'),'37722');
  assert.equal(href.searchParams.get('p'),'43428124436');
  assert.notEqual(await link.getAttribute('target'),'_blank');
  report.passes.push('live product HTTP 200; exact Awin merchant, publisher, product IDs and no popup');
  await link.click({timeout:20000,noWaitAfter:true});
  const deadline=Date.now()+30000;
  while(Date.now()<deadline){
   const host=new URL(page.url()).hostname;
   if(['www.diversual.com','diversual.com'].includes(host))break;
   await page.waitForTimeout(500);
  }
  const dest=new URL(page.url());
  report.merchant={host:dest.hostname,pathname:dest.pathname,awinRequests:requests.filter(x=>x.host.includes('awin1.com')).length,diversualRequests:requests.filter(x=>x.host.includes('diversual.com')).length,responses:pages.slice(0,12),openedWindows:context.pages().length-1};
  assert.ok(['www.diversual.com','diversual.com'].includes(dest.hostname),'did not reach Diversual; landed at '+dest.hostname);
  assert.equal(context.pages().length,1,'popup/new tab was created');
  await page.waitForLoadState('domcontentloaded',{timeout:10000}).catch(()=>{});
  await page.screenshot({path:'merchant-evidence/'+engine+'/destination.png',fullPage:false});
  report.passes.push('one live Awin tracking click actually reached Diversual in same tab');
  await context.close();
 }finally{await browser.close()}
};
run().catch(e=>{report.failures.push(String(e?.stack||e));process.exitCode=1}).finally(()=>{
 report.end=new Date().toISOString();report.pass=report.failures.length===0;
 fs.writeFileSync(outfile,JSON.stringify(report,null,2));
 console.log('REAL_AWIN_REDIRECT_'+engine.toUpperCase()+'='+JSON.stringify(report));
 if(!report.pass)process.exitCode=1;
});
