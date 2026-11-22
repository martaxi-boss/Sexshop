import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const files=[
  ['overrides/apps/ecommerce-shop-demo/src/components/sevelora-product-card.tsx','apps/ecommerce-shop-demo/src/components/sevelora-product-card.tsx'],
  ['overrides/apps/ecommerce-shop-demo/src/app/produto/[id]/page.tsx','apps/ecommerce-shop-demo/src/app/produto/[id]/page.tsx']
];
for (const [sourcePath,mirrorPath] of files){
  const source=await readFile(sourcePath,'utf8');
  const mirror=await readFile(mirrorPath,'utf8');
  assert.equal(source,mirror,'source and build mirror must match: '+sourcePath);
  for (const [label,text] of [['source',source],['mirror',mirror]]){
    assert.match(text,/href=\{p\.affiliateUrl\}/,'use validated affiliate URL from catalog');
    assert.match(text,/rel="sponsored nofollow noopener"/,'keep affiliate disclosure and security');
    assert.doesNotMatch(text,/target\s*=\s*["']_blank["']/i,'no new tabs or popups');
    assert.doesNotMatch(text,/window\.open\s*\(/i,'no scripted popups');
    console.log('PASS '+label+' '+(label==='source'?sourcePath:mirrorPath)+' [same tab, affiliate preserved]');
  }
}
const importer=await readFile('scripts/sync-diversual.mjs','utf8');
assert.match(importer,/link\.searchParams\.get\('a'\)!=='3157353'/);
assert.match(importer,/link\.searchParams\.get\('m'\)!=='37722'/);
assert.match(importer,/link\.pathname!=='\/pclick\.php'/);
console.log('AFFILIATE_BROWSER_NAVIGATION_STATIC_PASS');
