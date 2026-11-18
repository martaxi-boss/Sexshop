import Catalogue from "@/components/sevelora-catalogue";
import { getCatalog } from "@/lib/sevelora-catalog-server";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryBySlug } from "@/lib/sevelora-data";
import { DecorativeArt } from "@/components/sevelora-cards";

export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> {
  const {slug}=await params; const c=categoryBySlug(slug);
  return { title:c?c.name:"Categoria", description:c?.line };
}
export default async function CategoryPage({params}: {params:Promise<{slug:string}>}){
  const {slug}=await params;const category=categoryBySlug(slug);if(!category)notFound();
  return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><Link href="/catalogo">Catálogo</Link><span>/</span><strong>{category.name}</strong></div>
  <section className="shell category-hero"><div><span className="eyebrow">DESCOBRE A COLEÇÃO</span><h1>{category.name}<span className="period">.</span></h1><p>{category.line}</p><Link href="/catalogo" className="text-link">← Voltar ao catálogo</Link></div><div className={`category-hero-art tone-${category.tone}`}><DecorativeArt type={category.symbol}/></div></section>
  <Catalogue catalog={await getCatalog()} initialCategory={slug}/>
  </>;
}
