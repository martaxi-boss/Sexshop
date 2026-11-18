import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { dirname } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

// Strict CSV parser, including quoted delimiters, CRLF and multiline fields.
export function parseCsv(input) {
  const rows=[];let row=[],field='',quoted=false;
  const s=input.replace(/^\uFEFF/,'');
  for(let i=0;i<s.length;i++) {
    const c=s[i];
    if(c==='"') { if(quoted&&s[i+1]==='"'){field+='"';i++;}else if(quoted){quoted=false;}else if(field===''){quoted=true;}else{throw Error('invalid_csv');} }
    else if(c===','&&!quoted){row.push(field);field='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&s[i+1]==='\n')i++;row.push(field);if(row.some(Boolean))rows.push(row);row=[];field='';}
    else field+=c;
  }
  if(quoted)throw Error('unterminated_csv');
  if(field||row.length){row.push(field);rows.push(row);}
  const header=rows.shift();if(!header)throw Error('empty_csv');
  return rows.map(r=>{if(r.length!==header.length)throw Error('csv_column_count');return Object.fromEntries(header.map((h,i)=>[h,r[i]]));});
}
const plain = s => String(s||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
const fold=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function classify(row) {
  const s=fold([row.product_name,row.description].join(' '));const tags=new Set();
  if(/lubricante|limpiador|higiene|preservativo|enema|kegel/.test(s))tags.add('bem-estar');
  if(/masaje|masajeador|vela de masaje/.test(s))tags.add('massagem');
  if(/lenceria|body de|braga|tanga|panty/.test(s))tags.add('lingerie');
  if(/pareja|parejas|juego|control remoto/.test(s))tags.add('para-casais');
  if(/prostata|pene|masturbador masculino|anillo/.test(s))tags.add('para-ele');
  if(/clitoris|vulva|vaginal|kegel|succionador/.test(s))tags.add('para-ela');
  if(/vibrador|vibradora|estimulador|dildo|plug|succionador|bala|bolas anales/.test(s))tags.add('estimuladores');
  if(/\banal\b|\banales\b|plug|enema|prostata|dilatador anal/.test(s))tags.add('anal');
  if(/bdsm|bondage|esposas|latigo|arnes|mascara|fetiche|castidad|cuerda erotica/.test(s))tags.add('bdsm');
  if(/arnes|bolsa|neceser|accesorio|juego|kit/.test(s)||!tags.size)tags.add('jogos-acessorios');
  return [...tags];
}
function safeUrl(raw,hosts){try{const u=new URL(raw);if(u.protocol!=='https:'||u.username||u.password||!hosts.includes(u.hostname))return null;return u;}catch{return null;}}
// Diversual publishes EUR product offers on its own pages, while this Awin feed
// has labelled their identical numeric prices GBP. Do not relabel or FX-convert blindly.
// Validate the actual retailer EUR offer for each affected product before display.
export function extractMerchantEurPrice(html, expectedMerchantUrl) {
  if (typeof html!=='string'||html.length>2000000)return null;
  let expected;try{expected=new URL(expectedMerchantUrl);}catch{return null;}
  if(expected.protocol!=='https:'||expected.hostname!=='www.diversual.com'||!expected.pathname.startsWith('/es/'))return null;
  const scripts=html.matchAll(/<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi);
  for(const m of scripts){
    let payload;try{payload=JSON.parse(m[1].trim());}catch{continue;}
    const stack=[payload];let seen=0;
    while(stack.length&&seen++<100){
      const node=stack.pop();if(!node||typeof node!=='object')continue;
      if(Array.isArray(node)){stack.push(...node);continue;}
      if(node['@graph'])stack.push(node['@graph']);
      const types=Array.isArray(node['@type'])?node['@type']:[node['@type']];
      if(!types.includes('Product'))continue;
      const offers=Array.isArray(node.offers)?node.offers:[node.offers];
      for(const offer of offers){
        if(!offer||typeof offer!=='object'||offer.priceCurrency!=='EUR')continue;
        const val=typeof offer.price==='number'?offer.price:Number(String(offer.price??'').trim());
        if(!Number.isFinite(val)||val<=0||val>20000||Math.abs(val*100-Math.round(val*100))>0.001)continue;
        let offerUrl;try{offerUrl=new URL(offer.url);}catch{continue;}
        if(offerUrl.protocol==='https:'&&offerUrl.hostname===expected.hostname&&offerUrl.pathname===expected.pathname){
          return Math.round(val*100)/100;
        }
      }
    }
  }
  return null;
}
export async function verifyMerchantEuroPrices(rows, fetcher=fetch) {
  const candidates=rows.filter(r=>r.currency==='GBP');
  const verified=new Map();let failed=0;let identical=0;let different=0;let next=0;
  const deadline=Date.now()+80000;
  const concurrency=Math.min(8,candidates.length);
  await Promise.all(Array.from({length:concurrency},async()=>{
    while(next<candidates.length&&Date.now()<deadline){
      const r=candidates[next++];
      let merchant;
      try{
        merchant=new URL(r.merchant_deep_link);
        if(merchant.protocol!=='https:'||merchant.hostname!=='www.diversual.com'||merchant.username||merchant.password||!merchant.pathname.startsWith('/es/')){failed++;continue;}
        merchant.search='';merchant.hash='';
      }catch{failed++;continue;}
      try{
        const response=await fetcher(merchant.href,{redirect:'error',signal:AbortSignal.timeout(7000),headers:{'User-Agent':'Mozilla/5.0 (compatible; SeveloraPriceVerify/1.0)'}});
        if(!response.ok||!String(response.headers?.get('content-type')||'').includes('text/html')){failed++;continue;}
        const html=await response.text();
        const euroPrice=extractMerchantEurPrice(html,merchant.href);
        if(euroPrice===null){failed++;continue;}
        verified.set(r.aw_product_id,euroPrice);
        if(Number(r.search_price)===euroPrice)identical++;else different++;
      }catch{failed++;}
    }
  }));
  return {verified,checked:verified.size,identical,different,failed,attempted:next};
}

export function normalize(rows, now=new Date(), verifiedEuros=new Map()) {
  if(!rows.length||rows.length>20000)throw Error('feed_size');
  const ids=new Set();let suppressedPrices=0;
  const products=rows.map(r=>{
    if(r.merchant_id!=='37722'||r.data_feed_id!=='78949')throw Error('wrong_supplier');
    const id=r.aw_product_id; if(!/^\d+$/.test(id)||ids.has(id))throw Error('invalid_product_id');ids.add(id);
    const link=safeUrl(r.aw_deep_link,['www.awin1.com','awin1.com']);
    if(!link||link.pathname!=='/pclick.php'||link.searchParams.get('a')!=='3157353'||link.searchParams.get('m')!=='37722'||link.searchParams.get('p')!==id)throw Error('invalid_affiliate_link');
    const directImage=safeUrl(r.merchant_image_url,['www.diversual.com','diversual.com']);if(!directImage)throw Error('invalid_image');
    const awImage=safeUrl(r.aw_image_url,['images.productserve.com','images2.productserve.com']);
    if(awImage&&(awImage.searchParams.get('feedId')!=='78949'||awImage.searchParams.get('url')!=='ssl:'+directImage.host+directImage.pathname))throw Error('invalid_awin_image');
    const image=awImage||directImage;
    const amount=Number(r.search_price);const nativeEur=r.currency==='EUR'&&Number.isFinite(amount)&&amount>0?amount:null;
    const verified=verifiedEuros.get(id);
    const price=nativeEur??(r.currency==='GBP'&&Number.isFinite(verified)&&verified>0?verified:null);
    if(price===null)suppressedPrices++;
    const name=plain(r.product_name).slice(0,200);if(!name)throw Error('missing_name');
    return {id,name,description:plain(r.description).slice(0,8000),image:image.href,affiliateUrl:link.href,categories:classify(r),price,currency:price===null?null:'EUR',inStock:r.in_stock==='1',brand:plain(r.brand_name)||'Diversual'};
  });
  return {version:1,merchantId:'37722',feedId:'78949',updatedAt:now.toISOString(),suppressedPrices,products};
}
export async function sync() {
  const urlFile=process.env.DIVERSUAL_URL_FILE||'/srv/projects/Sexshop/.private/diversual-feed-url';
  const out=process.env.CATALOG_PATH||'/srv/projects/Sexshop/data/catalog.json';
  const u=new URL((await readFile(urlFile,'utf8')).trim());
  if(u.protocol!=='https:'||u.hostname!=='productdata.awin.com'||!u.pathname.includes('/fid/78949/'))throw Error('invalid_feed_endpoint');
  const response=await fetch(u,{redirect:'error',signal:AbortSignal.timeout(90000)});
  if(!response.ok)throw Error('feed_http_'+response.status);
  const chunks=[];let bytes=0;
  for await(const chunk of response.body){bytes+=chunk.length;if(bytes>20_000_000)throw Error('feed_too_large');chunks.push(chunk);}
  let data=Buffer.concat(chunks);if(data[0]===31&&data[1]===139)data=gunzipSync(data,{maxOutputLength:50_000_000});
  const rows=parseCsv(data.toString('utf8'));
  normalize(rows); // Validate merchant, IDs, affiliate URLs, image origins before any retailer lookups.
  const merchantPrices=await verifyMerchantEuroPrices(rows);
  if(rows.some(r=>r.currency==='GBP')&&merchantPrices.checked===0)throw Error('eur_prices_not_verified');
  const catalog=normalize(rows,new Date(),merchantPrices.verified);
  await mkdir(dirname(out),{recursive:true});const temp=out+'.tmp';
  await writeFile(temp,JSON.stringify(catalog),{mode:0o640});await rename(temp,out);
  console.log(JSON.stringify({status:'updated',products:catalog.products.length,suppressedPrices:catalog.suppressedPrices,verifiedEuroPrices:merchantPrices.checked,merchantPriceMatches:merchantPrices.identical,merchantPriceDifferences:merchantPrices.different,merchantPriceFailures:merchantPrices.failed,updatedAt:catalog.updatedAt}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)sync().catch(()=>{console.error('CATALOG_SYNC_FAILED: previous catalog preserved; inspect provider configuration privately.');process.exitCode=1;});
