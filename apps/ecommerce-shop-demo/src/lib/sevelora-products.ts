export type Product={id:string;name:string;description:string;image:string;affiliateUrl:string;categories:string[];price:number|null;currency:'EUR'|null;inStock:boolean;brand:string};
export type ProductCatalog={version:1;merchantId:string;feedId:string;updatedAt:string|null;suppressedPrices:number;products:Product[];stale:boolean};
export const euro=(n:number)=>new Intl.NumberFormat('pt-PT',{style:'currency',currency:'EUR'}).format(n);
