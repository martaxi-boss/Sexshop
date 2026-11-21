import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {mkdtemp,writeFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join,resolve} from "node:path";
import {setTimeout as delay} from "node:timers/promises";
import {curatedProducts} from "./diversual-ptpt.mjs";

// Public editorial fixtures only. Never reads or copies the private supplier feed.
const products=[...curatedProducts.entries()].filter(([,p])=>!p.hidden).map(([id,p])=>({
  ...p,id,image:"/icon.svg",affiliateUrl:"https://www.awin1.com/pclick.php?p="+id+"&a=3157353&m=37722",
  price:10,currency:"EUR",inStock:true,brand:"Diversual"
}));
const dir=await mkdtemp(join(tmpdir(),"sevelora-pagination-"));
const fixture=join(dir,"catalog.json");
await writeFile(fixture,JSON.stringify({version:1,merchantId:"37722",feedId:"78949",updatedAt:new Date().toISOString(),suppressedPrices:0,products,stale:false}));
const base="http://127.0.0.1:3012",origin=process.env.NEXT_PUBLIC_SITE_URL||"https://sevelora.eu";
const server=spawn(process.execPath,[resolve("apps/ecommerce-shop-demo/node_modules/next/dist/bin/next"),"start","--port","3012","--hostname","127.0.0.1"],{
  cwd:resolve("apps/ecommerce-shop-demo"),env:{...process.env,CATALOG_PATH:fixture},stdio:["ignore","pipe","pipe"]
});
let logs="";
server.stdout.on("data",d=>{logs=(logs+d).slice(-5000);});
server.stderr.on("data",d=>{logs=(logs+d).slice(-5000);});
try{
  let ready=false;
  for(let i=0;i<60;i++){
    try{if((await fetch(base+"/robots.txt")).ok){ready=true;break;}}catch{}
    await delay(250);
  }
  assert.ok(ready,"Built server did not start: "+logs);
  async function crawl(start,expected){
    const seen=new Set(),pages=new Set();let path=start;
    while(path){
      assert.ok(!pages.has(path),"Pagination loop at "+path);pages.add(path);
      const response=await fetch(base+path);
      assert.equal(response.status,200,path);
      const html=await response.text();
      const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replaceAll("&amp;","&");
      assert.equal(canonical,origin+path,"Pagination needs its own canonical: "+path);
      const ids=new Set([...html.matchAll(/href="\/produto\/(\d+)"/g)].map(m=>m[1]));
      assert.ok(ids.size>0&&ids.size<=24,"Expected one nonempty page of at most 24 products: "+path);
      for(const id of ids){assert.ok(!seen.has(id),"Repeated product on separate pages: "+id);seen.add(id);}
      path=html.match(/<a\b[^>]*href="([^"]+)"[^>]*>Mostrar mais produtos/)?.[1]?.replaceAll("&amp;","&");
      assert.ok(pages.size<=10,"Unbounded pagination");
    }
    assert.deepEqual([...seen].sort(),expected.map(p=>p.id).sort(),"Products missing from plain HTML links: "+start);
    console.log("PAGINATION_CRAWL_PASS="+start+" pages="+pages.size+" products="+seen.size);
  }
  await crawl("/catalogo",products);
  const xml=await (await fetch(base+"/sitemap.xml")).text();
  const xmlUrls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  const txtResponse=await fetch(base+"/sitemap.txt");
  assert.equal(txtResponse.status,200);
  assert.match(txtResponse.headers.get("content-type"),/^text\/plain; charset=utf-8$/i);
  const txt=await txtResponse.text(),txtUrls=txt.trimEnd().split("\n");
  assert.ok(!txt.startsWith("\uFEFF"),"Text sitemap must not contain a BOM");
  assert.deepEqual(txtUrls,xmlUrls,"XML and TXT must expose the same live URLs in the same order");
  const categoryCount=new Set(products.map(p=>p.categories[0])).size;
  assert.equal(new Set(txtUrls).size,products.length+5+categoryCount,"Every product, active category and institutional URL appears once");
  assert.ok(!txtUrls.some(url=>url.endsWith('/categoria/bdsm')),"Retired category must not appear in sitemap");
  assert.ok(txtUrls.every(url=>url===origin||url.startsWith(origin+"/")),"Only canonical public URLs");
  const txtHead=await fetch(base+"/sitemap.txt",{method:"HEAD"});
  assert.equal(txtHead.status,200);assert.equal(await txtHead.text(),"");
  assert.equal((await fetch(base+"/sitemap.txt",{method:"POST"})).status,405);
  const robots=await (await fetch(base+"/robots.txt")).text();
  for(const extension of ["xml","txt"])assert.ok(robots.includes("Sitemap: "+origin+"/sitemap."+extension));
  console.log("SITEMAP_XML_TXT_PARITY=PASS urls="+txtUrls.length);
  for(const category of new Set(products.map(p=>p.categories[0])))
    await crawl("/categoria/"+category,products.filter(p=>p.categories.includes(category)));
  for(const path of ["/catalogo?pagina=999999","/categoria/estimuladores?pagina=999999"])
    assert.equal((await fetch(base+path)).status,404,"Out-of-range page must return 404");
  const filtered=await fetch(base+"/catalogo?categoria=estimuladores&pagina=2");
  assert.equal(filtered.status,200,"Category-filter pagination fallback");
  console.log("PAGINATION_HTTP_REGRESSION=PASS");
}finally{
  server.kill("SIGTERM");
  await rm(dir,{recursive:true,force:true});
}
