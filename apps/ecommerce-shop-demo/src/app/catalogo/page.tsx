import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {catalogueHref,pageNumber,pageSize} from "@/lib/sevelora-pagination";
import {matchesCategory} from "@/lib/sevelora-products";
import Catalogue from "@/components/sevelora-catalogue";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {categories} from "@/lib/sevelora-data";
import Link from "next/link";
const baseMetadata:Metadata={alternates:{canonical:"/catalogo"},title:"Sex Shop · Catálogo",description:"Escolhe brinquedos sexuais por categoria e função: vibradores, sugadores, masturbadores, BDSM, produtos íntimos e acessórios."};
type Search = {categoria?:string;q?:string;tipo?:string;pagina?:string};
export async function generateMetadata({searchParams}:{searchParams:Promise<Search>}):Promise<Metadata>{
 const p=await searchParams,page=pageNumber(p.pagina);
 return {...baseMetadata,alternates:{canonical:p.categoria||p.q||p.tipo?"/catalogo":catalogueHref(page)},title:page>1?"Sex Shop · Catálogo · Página "+page:baseMetadata.title};
}
export default async function CatalogoPage({searchParams}:{searchParams:Promise<Search>}){
 const p=await searchParams;
 const category=categories.some(c=>c.slug===p.categoria)?(p.categoria??"todos"):"todos";
 const query=typeof p.q==="string"?p.q.slice(0,100):"";
 const type=typeof p.tipo==="string"&&/^[a-z0-9-]{1,40}$/.test(p.tipo)?p.tipo:"";
 const page=pageNumber(p.pagina),catalog=await getCatalog();
 const fold=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-PT");
 const count=catalog.products.filter(product=>matchesCategory(product,category)&&(!type||product.subcategories.includes(type))&&(!query||fold([product.name,product.description,product.brand].join(" ")).includes(fold(query.trim())))).length;
 if(page>1&&(page-1)*pageSize>=count)notFound();
 return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><strong>Sex Shop · Catálogo</strong></div><Catalogue catalog={catalog} initialCategory={category} initialQuery={query} initialType={type} initialPage={page} key={[category,query,type,page].join(":")}/></>;
}
