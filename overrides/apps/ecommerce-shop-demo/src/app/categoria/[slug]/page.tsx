import type {Metadata} from "next";
import Link from "next/link";
import {catalogueHref,pageNumber,pageSize} from "@/lib/sevelora-pagination";
import {notFound} from "next/navigation";
import Catalogue from "@/components/sevelora-catalogue";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {matchesCategory} from "@/lib/sevelora-products";
import {categoryBySlug} from "@/lib/sevelora-data";
export async function generateMetadata({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{pagina?:string}>}):Promise<Metadata>{
 const {slug}=await params,c=categoryBySlug(slug);
 const page=pageNumber((await searchParams).pagina);
 return {alternates:{canonical:catalogueHref(page,slug)},title:c?c.name+" · Sex Shop"+(page>1?" · Página "+page:""):"Categoria",description:c?.line};
}
export default async function CategoryPage({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{pagina?:string}>}){
 const {slug}=await params,c=categoryBySlug(slug);if(!c)notFound();
 const catalog=await getCatalog(),matching=catalog.products.filter(p=>matchesCategory(p,slug));
 const page=pageNumber((await searchParams).pagina);
 if(page>1&&(page-1)*pageSize>=matching.length)notFound();
 const suggestions=c.filters.filter(f=>matching.some(p=>(p.subcategories||[]).includes(f.type)));
 return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><Link href="/catalogo">Catálogo</Link><span>/</span><strong>{c.name}</strong></div>
 <section className="retail-category-hero"><div className="shell"><div><span>SEX SHOP / CATEGORIAS</span><h1>{c.name}<em>.</em></h1><p>{c.line}</p></div><div className="retail-count"><strong>{matching.length}</strong><span>{matching.length===1?"ARTIGO NO CATÁLOGO":"ARTIGOS NO CATÁLOGO"}</span></div></div></section>
 {suggestions.length>0&&<nav className="shell retail-subnav" aria-label={"Explorar "+c.name}><strong>POR TIPO:</strong>{suggestions.map(f=><Link key={f.type} href={"/catalogo?categoria="+encodeURIComponent(slug)+"&tipo="+encodeURIComponent(f.type)}>{f.label} ({matching.filter(p=>(p.subcategories||[]).includes(f.type)).length}) ↗</Link>)}</nav>}
 <Catalogue catalog={catalog} initialCategory={slug} initialPage={page} key={slug+":"+page}/></>;
}
