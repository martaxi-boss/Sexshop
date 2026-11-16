import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug, collections } from "@/lib/sevelora-data";
import { CollectionCard, DecorativeArt } from "@/components/sevelora-cards";

export function generateStaticParams(){ return categories.map(c=>({slug:c.slug})); }
export async function generateMetadata({params}: {params: Promise<{slug:string}>}): Promise<Metadata> {
  const {slug}=await params; const c=categoryBySlug(slug);
  return { title:c?c.name:"Categoria", description:c?.line };
}
export default async function CategoryPage({params}: {params:Promise<{slug:string}>}){
  const {slug}=await params;const category=categoryBySlug(slug);if(!category)notFound();
  const items=collections.filter(c=>c.category===slug);
  return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><Link href="/catalogo">Catálogo</Link><span>/</span><strong>{category.name}</strong></div>
  <section className="shell category-hero"><div><span className="eyebrow">DESCOBRE A COLEÇÃO</span><h1>{category.name}<span className="period">.</span></h1><p>{category.line}</p><Link href="/catalogo" className="text-link">← Voltar ao catálogo</Link></div><div className={`category-hero-art tone-${category.tone}`}><DecorativeArt type={category.symbol}/></div></section>
  <section className="shell section-block category-section"><div className="heading-row"><div><span className="eyebrow">POR ONDE COMEÇAR</span><h2>Explora esta categoria.</h2></div></div><div className="subcategory-grid">{category.sub.map(s=><div key={s} className="subcategory-item"><span aria-hidden="true">◇</span><span>{s}</span><span className="subcategory-arrow" aria-hidden="true">↗</span></div>)}</div>
  <div className="heading-row spaced"><div><span className="eyebrow">SELEÇÕES EDITORIAIS</span><h2>Escolhas para descobrir.</h2></div></div>
  <div className="collection-grid">{items.map((item,i)=><CollectionCard key={item.name} item={item} index={i}/>)}</div>
  <div className="category-info"><h3>Estamos a preparar o catálogo</h3><p>Estes grupos ajudam a encontrar o tipo de produto que procuras. Os artigos reais, fotografias oficiais, preços e links de compra serão mostrados depois de confirmadas as parcerias com os fornecedores.</p><Link href="/guias">Explorar os guias de compra ↗</Link></div>
  </section></>;
}
