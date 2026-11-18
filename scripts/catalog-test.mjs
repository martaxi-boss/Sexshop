import assert from 'node:assert/strict';
import {normalize,parseCsv,classify,extractMerchantEurPrice,verifyMerchantEuroPrices} from './sync-diversual.mjs';
assert.deepEqual(parseCsv('a,b\r\n"x,y","one\n""two"""\r\n'),[{a:'x,y',b:'one\n"two"'}]);
assert.throws(()=>parseCsv('a,b\n"bad'));
const r={merchant_id:'37722',data_feed_id:'78949',aw_product_id:'123',product_name:'Produto de teste',description:'<b>Informação</b>',aw_deep_link:'https://www.awin1.com/pclick.php?p=123&a=3157353&m=37722',merchant_image_url:'https://www.diversual.com/test.jpg',search_price:'12.90',currency:'EUR',in_stock:'1'};
assert.equal(normalize([r]).products[0].price,12.9);
assert.equal(normalize([{...r,currency:'GBP'}]).products[0].price,null);
assert.throws(()=>normalize([{...r,aw_deep_link:r.aw_deep_link.replace('3157353','999')} ]));
assert.throws(()=>normalize([{...r,merchant_id:'999'}]));
assert.throws(()=>normalize([r,r]));
assert.equal(normalize([{...r,in_stock:'0'}]).products[0].inStock,false);
assert.ok(classify({product_name:'Lubricante',description:''}).includes('bem-estar'));
assert.ok(!normalize([r]).products[0].description.includes('<b>'));
assert.ok(classify({product_name:'Kit BDSM Bondage',description:''}).includes('bdsm'));
assert.ok(classify({product_name:'Plug Anal',description:''}).includes('anal'));

// GBP-labelled figures are NEVER converted or relabelled without checking the
// corresponding official merchant product page and a real EUR structured offer.
const official='https://www.diversual.com/es/produto-teste-123.html';
const body='<script type="application/ld+json">'+JSON.stringify({'@type':'Product',name:'Produto de teste',offers:{'@type':'Offer',priceCurrency:'EUR',url:official,price:'12.90'}})+'</script>';
assert.equal(extractMerchantEurPrice(body,official),12.9);
assert.equal(extractMerchantEurPrice(body,'https://www.diversual.com/es/outro.html'),null);
assert.equal(extractMerchantEurPrice(body.replace('EUR','GBP'),official),null);
assert.equal(extractMerchantEurPrice(body.replace('12.90','0'),official),null);
const gbp={...r,currency:'GBP',merchant_deep_link:official};
assert.equal(normalize([gbp]).products[0].price,null);
const checked=await verifyMerchantEuroPrices([gbp],async(url,opts)=>{
  assert.equal(url,official);assert.equal(opts.redirect,'error');
  return new Response(body,{status:200,headers:{'content-type':'text/html; charset=utf-8'}});
});
assert.equal(checked.checked,1);
assert.equal(checked.identical,1);
assert.equal(normalize([gbp],new Date(),checked.verified).products[0].price,12.9);
assert.equal(normalize([{...gbp,currency:'USD'}],new Date(),checked.verified).products[0].price,null);

console.log('CATALOG_VALIDATION_TESTS=PASS');
