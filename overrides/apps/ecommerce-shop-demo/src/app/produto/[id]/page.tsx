import Link from "next/link";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {categoryBySlug,subcategoryLabels} from "@/lib/sevelora-data";
import {euro} from "@/lib/sevelora-products";
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
 const {id}=await params;const c=await getCatalog(),p=c.products.find(p=>p.id===id);
 return {title:p?p.name+" · Sevelora":"Produto Diversual",description:p?.description};
}
export default async function ProductPage({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const catalog=await getCatalog();const p=catalog.products.find(p=>p.id===id);if(!p)notFound();
 const cats=p.categories.map(categoryBySlug).filter(x=>x!==undefined);
 return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><Link href="/catalogo">Catálogo</Link><span>/</span><strong>{p.name}</strong></div>
 <section className="shell product-detail"><div className="detail-image"><img src={p.image} alt={p.name} width="600" height="600"/></div><div>
 <span className="eyebrow">DIVERSUAL · LINK DE AFILIADO</span><h1>{p.name}</h1>
 <p className="product-price">{p.price!==null?euro(p.price):"Consultar preço na Diversual"}</p>
 <p>{p.inStock?"Disponível no catálogo do parceiro.":"Indisponível no catálogo do parceiro."}</p>
 <h2>Sobre este produto</h2><p lang="pt-PT">{p.description}</p>
 <p className="detail-translation-note">Descrição em português de Portugal adaptada à informação oficial do fornecedor.</p>
 {p.subcategories?.length>0&&<p className="detail-type-label"><strong>Tipo:</strong> {p.subcategories.map(s=>subcategoryLabels[s]||s).join(", ")}</p>}
 {cats.length>0&&<nav className="detail-category-links" aria-label="Categoria principal deste produto"><strong>Categoria:</strong>{cats.map(c=><Link key={c.slug} href={"/categoria/"+c.slug}>{c.name} ↗</Link>)}</nav>}
 {p.inStock&&<p><a className="button button-dark" href={p.affiliateUrl} rel="sponsored nofollow noopener" target="_blank">VER PREÇO E COMPRAR NA DIVERSUAL ↗</a></p>}
 <p>Compra e pagamento realizados na Diversual. Confirma o preço final, envio para Portugal, portes, especificações e condições de devolução antes de comprar.</p><Link href="/afiliacao" className="text-link">Informação de afiliação ↗</Link>
 </div></section></>;
}
