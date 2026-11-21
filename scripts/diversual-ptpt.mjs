import batch01 from './diversual-ptpt-01.mjs';
import batch02 from './diversual-ptpt-02.mjs';

// Fonte editorial por aw_product_id. UMA categoria de produto principal por artigo.
// "Para Ela/Ele/Casais" são percursos de descoberta (audiences), não categorias de produto.
// Em particular, não classificar por palavras-chave genéricas da descrição promocional.
export const primaryCategoryByType=Object.freeze({
  'rabbits':'estimuladores','vibradores':'estimuladores','vibradores-compactos':'estimuladores',
  'sugadores':'estimuladores','dildos':'estimuladores','ovos':'estimuladores',
  'estimulacao-oral':'estimuladores','kegel':'estimuladores','masturbadores':'masturbadores','aneis':'aneis',
  'prostata':'anal','plugs':'anal','bolas-anais':'anal',
  'vibradores-anais':'anal','higiene-anal':'anal','kits-anal':'anal',
  'arneses':'casais','strap-ons':'casais','vibradores-casais':'casais',
  'lubrificantes':'bem-estar','higiene':'bem-estar',
  'geis-estimulantes':'bem-estar','cosmetica':'bem-estar','desempenho':'bem-estar',
  'velas':'massagem','oleos':'massagem','kits-massagem':'massagem',
  'kits':'jogos-acessorios','arrumacao':'jogos-acessorios',
  'livros':'jogos-acessorios',
  'perfumes':'feromonas','incensos':'feromonas','aromas':'feromonas'
});
const allowedAudiences=Object.freeze({
  'para-ela':new Set(['rabbits','vibradores','vibradores-compactos','sugadores',
    'ovos','estimulacao-oral','kegel']),
  'para-ele':new Set(['masturbadores','aneis','prostata','desempenho']),
  'para-casais':new Set(['arneses','strap-ons','vibradores-casais','ovos',
    'aneis','kits','kits-massagem'])
});
// Exclusão permanente pedida pelo proprietário: cabos magnéticos M1, M2 e M3.
// Mantém-se a entrada editorial por ID para impedir reaparições em cada sincronização.
const ownerExcludedIds=new Set(['43597976280','43597976281','43597976282']);
const map=new Map();
for(const entry of [...batch01,...batch02]){
  if(!Array.isArray(entry)||entry.length!==5)throw Error('invalid_curated_entry');
  const [id,name,description,oldSlugs,type]=entry;
  if(!/^\d+$/.test(id)||map.has(id)||!name||!description||!type)throw Error('invalid_curated_product');
  const hiddenReason=type==='embalagem'?'nonretail':ownerExcludedIds.has(id)?'owner_request':null;
  const hidden=hiddenReason!==null;
  const primary=primaryCategoryByType[type];
  if(!hidden&&!primary)throw Error('type_without_primary_category:'+id+':'+type);
  const previous=oldSlugs?oldSlugs.split(','):[];
  if(hiddenReason==='nonretail'&&previous.length)throw Error('shipping_package_visible:'+id);
  if(hiddenReason==='owner_request'&&type!=='carregadores')throw Error('owner_suppression_wrong_type:'+id);
  const audiences=hidden?[]:previous.filter(slug=>allowedAudiences[slug]?.has(type));
  map.set(id,{id,name,description,primaryCategory:hidden?null:primary,
    categories:hidden?[]:[primary],audiences,subcategories:hidden?[]:[type],hidden,hiddenReason});
}
if(map.size!==151)throw Error('expected_151_curated_products');
if([...map.values()].filter(p=>p.hiddenReason==='owner_request').length!==ownerExcludedIds.size)
  throw Error('owner_excluded_ids_missing');
export const curatedProducts=map;
export const curatedProductCount=map.size;
