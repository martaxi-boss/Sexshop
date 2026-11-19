import batch01 from './diversual-ptpt-01.mjs';
import batch02 from './diversual-ptpt-02.mjs';

// Cada registo foi revisto a partir do título e da descrição do feed Diversual.
// Nunca usar descrição inteira ou palavras promocionais para inferir categorias.
const allowedCategories=new Set(['para-ela','para-ele','para-casais','estimuladores','anal','bdsm','lingerie','bem-estar','massagem','jogos-acessorios','feromonas']);
const map=new Map();
for(const entry of [...batch01,...batch02]){
  if(!Array.isArray(entry)||entry.length!==5)throw Error('invalid_curated_entry');
  const [id,name,description,slugs,type]=entry;
  if(!/^\d+$/.test(id)||map.has(id)||!name||!description||!type)throw Error('invalid_curated_product');
  const categories=slugs?slugs.split(','):[];
  if(categories.some(slug=>!allowedCategories.has(slug)))throw Error('unknown_curated_category:'+id);
  map.set(id,{id,name,description,categories,subcategories:categories.length?[type]:[],hidden:categories.length===0});
}
if(map.size!==151)throw Error('expected_151_curated_products');
export const curatedProducts=map;
export const curatedProductCount=map.size;
