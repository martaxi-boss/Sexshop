import type {Metadata} from "next";
import Catalogue from "@/components/sevelora-catalogue";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {categories} from "@/lib/sevelora-data";
import Link from "next/link";
export const metadata:Metadata={alternates:{canonical:"/catalogo"},title:"Sex Shop · Catálogo",description:"Escolhe brinquedos sexuais por categoria e função: vibradores, sugadores, masturbadores, BDSM, produtos íntimos e acessórios."};
export default async function CatalogoPage({searchParams}:{searchParams:Promise<{categoria?:string;q?:string;tipo?:string}>}){
 const p=await searchParams;
 const category=categories.some(c=>c.slug===p.categoria)?(p.categoria??"todos"):"todos";
 const query=typeof p.q==="string"?p.q.slice(0,100):"";
 const type=typeof p.tipo==="string"&&/^[a-z0-9-]{1,40}$/.test(p.tipo)?p.tipo:"";
 return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><strong>Sex Shop · Catálogo</strong></div><Catalogue catalog={await getCatalog()} initialCategory={category} initialQuery={query} initialType={type}/></>;
}
