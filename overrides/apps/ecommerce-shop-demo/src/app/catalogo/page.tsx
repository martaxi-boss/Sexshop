import type {Metadata} from "next";
import Catalogue from "@/components/sevelora-catalogue";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {categories} from "@/lib/sevelora-data";
import Link from "next/link";
export const metadata:Metadata={title:"Sex Shop · Catálogo",description:"Explora produtos reais para adultos: vibradores, sugadores, artigos para casais, BDSM, lingerie e cuidados."};
export default async function CatalogoPage({searchParams}:{searchParams:Promise<{categoria?:string;q?:string}>}){
  const p=await searchParams;
  const category=categories.some(c=>c.slug===p.categoria)?p.categoria:"todos";
  const query=typeof p.q==="string"?p.q.slice(0,100):"";
  return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><strong>Sex Shop · Catálogo</strong></div><Catalogue catalog={await getCatalog()} initialCategory={category} initialQuery={query}/></>;
}
