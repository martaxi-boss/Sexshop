import batch01 from './diversual-ptpt-01.mjs';
import batch02 from './diversual-ptpt-02.mjs';

// Fonte editorial por aw_product_id. UMA categoria de produto principal por artigo.
// "Para Ela/Ele/Casais" são percursos de descoberta (audiences), não categorias de produto.
// Em particular, não classificar por palavras-chave genéricas da descrição promocional.
export const primaryCategoryByType=Object.freeze({
  'rabbits':'estimuladores','vibradores':'estimuladores','vibradores-compactos':'estimuladores',
  'sugadores':'estimuladores','dildos':'estimuladores','ovos':'estimuladores',
  'estimulacao-oral':'estimuladores','masturbadores':'masturbadores','aneis':'aneis',
  'prostata':'anal','plugs':'anal','bolas-anais':'anal',
  'vibradores-anais':'anal','higiene-anal':'anal','kits-anal':'anal',
  'arneses':'casais','strap-ons':'casais','vibradores-casais':'casais',
  'kits-bdsm':'bdsm',
  'lubrificantes':'bem-estar','higiene':'bem-estar','kegel':'bem-estar',
  'geis-estimulantes':'bem-estar','cosmetica':'bem-estar','desempenho':'bem-estar',
  'velas':'massagem','oleos':'massagem','kits-massagem':'massagem',
  'kits':'jogos-acessorios','arrumacao':'jogos-acessorios',
  'carregadores':'jogos-acessorios','livros':'jogos-acessorios',
  'perfumes':'feromonas','incensos':'feromonas','aromas':'feromonas'
});
const allowedAudiences=Object.freeze({
  'para-ela':new Set(['rabbits','vibradores','vibradores-compactos','sugadores',
    'ovos','estimulacao-oral','kegel']),
  'para-ele':new Set(['masturbadores','aneis','prostata','desempenho']),
  'para-casais':new Set(['arneses','strap-ons','vibradores-casais','ovos',
    'aneis','kits','kits-massagem','kits-bdsm'])
});
const map=new Map();
for(const entry of [...batch01,...batch02]){
  if(!Array.isArray(entry)||entry.length!==5)throw Error('invalid_curated_entry');
  const [id,name,description,oldSlugs,type]=entry;
  if(!/^\d+$/.test(id)||map.has(id)||!name||!description||!type)throw Error('invalid_curated_product');
  const hidden=type==='embalagem';
  const primary=primaryCategoryByType[type];
  if(!hidden&&!primary)throw Error('type_without_primary_category:'+id+':'+type);
  const previous=oldSlugs?oldSlugs.split(','):[];
  if(hidden&&previous.length)throw Error('shipping_package_visible:'+id);
  const audiences=hidden?[]:previous.filter(slug=>allowedAudiences[slug]?.has(type));
  map.set(id,{id,name,description,primaryCategory:hidden?null:primary,
    categories:hidden?[]:[primary],audiences,subcategories:hidden?[]:[type],hidden});
}
if(map.size!==151)throw Error('expected_151_curated_products');
export const curatedProducts=map;
export const curatedProductCount=map.size;
