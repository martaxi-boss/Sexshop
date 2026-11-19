import 'server-only';
import { readFile } from 'node:fs/promises';
import { connection } from 'next/server';
import type { ProductCatalog } from './sevelora-products';
export async function getCatalog():Promise<ProductCatalog>{
  await connection();
  const empty:ProductCatalog={version:1,merchantId:'37722',feedId:'78949',updatedAt:null,suppressedPrices:0,products:[],stale:true};
  try{
    const c=JSON.parse(await readFile(/* turbopackIgnore: true */ process.env.CATALOG_PATH||'/srv/projects/Sexshop/data/catalog.json','utf8')) as ProductCatalog;
    if(c.version!==1||c.merchantId!=='37722'||c.feedId!=='78949'||!Array.isArray(c.products)||!c.updatedAt)return empty;
    const age=Date.now()-Date.parse(c.updatedAt);const stale=!Number.isFinite(age)||age>72*3600*1000||age< -300000;
    return {...c,stale,products:stale?[]:c.products};
  }catch{return empty;}
}
