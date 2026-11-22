import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const target=process.argv[2];
assert.ok(target,'Expected private CI fixture output path');
const catalog={
 version:1,merchantId:'37722',feedId:'78949',updatedAt:new Date().toISOString(),suppressedPrices:0,stale:false,
 products:[{
  id:'34454438089',name:'Lubrificante de teste para compatibilidade',description:'Artigo de teste, sem venda real.',
  image:'data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22400%22%20height=%22400%22%3E%3C/svg%3E',
  affiliateUrl:'https://www.awin1.com/pclick.php?p=34454438089&a=3157353&m=37722',
  categories:['bem-estar'],audiences:[],subcategories:['lubrificantes'],price:12.9,currency:'EUR',inStock:true,brand:'Diversual'
 }]
};
await writeFile(target,JSON.stringify(catalog),{mode:0o600});
console.log('AFFILIATE_BROWSER_FIXTURE_CREATED (synthetic, no private feed)');
