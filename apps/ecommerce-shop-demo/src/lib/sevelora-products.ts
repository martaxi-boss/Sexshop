export type Product={
 id:string;name:string;description:string;image:string;affiliateUrl:string;
 categories:string[];audiences:string[];subcategories:string[];
 price:number|null;currency:'EUR'|null;inStock:boolean;brand:string
};
export type ProductCatalog={
 version:1;merchantId:string;feedId:string;updatedAt:string|null;suppressedPrices:number;
 sourceProducts?:number;unreviewedProducts?:number;excludedNonRetail?:number;
 products:Product[];stale:boolean
};
export const audienceSlugs=['para-ela','para-ele','para-casais'] as const;
export const isAudience=(slug:string)=>audienceSlugs.some(x=>x===slug);
export const matchesCategory=(p:Product,slug:string)=>
 slug==='todos'||(isAudience(slug)?(p.audiences||[]).includes(slug):p.categories.includes(slug));
export const euro=(n:number)=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(n);
