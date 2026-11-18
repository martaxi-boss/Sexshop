import Link from "next/link";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {categories,guides} from "@/lib/sevelora-data";
import {ProductCard} from "@/components/sevelora-product-card";
export default async function Home(){
 const catalog=await getCatalog(),available=catalog.products.filter(p=>p.inStock);
 const hero=available.slice(0,2),featured=available.slice(0,8);
 const shown=catalog.products.length?categories.filter(c=>catalog.products.some(p=>p.categories.includes(c.slug))):categories.slice(0,8);
 return <>
 <section className="retail-hero"><div className="shell retail-hero-inner">
 <div className="retail-copy"><span className="retail-eyebrow">✦ SEX SHOP ONLINE · +18 · PORTUGAL</span><h1>O TEU PRAZER.<br/><strong>AS TUAS REGRAS<span>.</span></strong></h1><p>Vibradores, sugadores, brinquedos para casais, lingerie e muito mais. Uma sex shop com categorias claras, produtos reais e liberdade para explorar.</p>
 <div className="retail-actions"><Link href="/catalogo" className="retail-cta">EXPLORAR SEX SHOP ↗</Link><Link href="#categorias" className="retail-cta-ghost">ESCOLHER CATEGORIA ↓</Link></div><div className="retail-hero-notes"><span>+18 / PARA ADULTOS</span><span>COMPRA NO PARCEIRO</span></div></div>
 <div className="retail-showcase"><div className="retail-showcase-head"><span>NA NOSSA MONTRA</span><strong>DIVERSUAL / AFILIADO</strong></div>
 {hero.length?<div className="retail-showcase-products">{hero.map(p=><Link key={p.id} href={"/produto/"+p.id} className="retail-showcase-item"><span><img src={p.image} width="350" height="350" alt={p.name}/></span><strong>{p.name}</strong><b>VER PRODUTO ↗</b></Link>)}</div>:<Link className="retail-showcase-fallback" href="/catalogo">VIBRADORES<br/>LINGERIE<br/>BDSM <small>EXPLORAR CATÁLOGO ↗</small></Link>}
 <small>Fotografias oficiais do fornecedor parceiro.</small></div></div></section>
 <div className="retail-trust"><div className="shell"><span><b>01 /</b> ESCOLHE A CATEGORIA</span><span><b>02 /</b> EXPLORA OS PRODUTOS</span><span><b>03 /</b> COMPRA NA LOJA PARCEIRA</span></div></div>
 <section className="shell retail-section" id="categorias"><div className="retail-section-head"><div><span>EXPLORA POR TIPO DE PRODUTO</span><h2>O que te apetece <em>descobrir?</em></h2><p>Encontra rapidamente a categoria certa, sem te perderes no catálogo.</p></div><Link href="/catalogo">TODOS OS PRODUTOS ↗</Link></div>
 <div className="retail-categories">{shown.map((c,i)=>{const found=catalog.products.filter(p=>p.categories.includes(c.slug)),preview=found.find(p=>p.inStock)||found[0];return <Link key={c.slug} href={"/categoria/"+c.slug} className={"retail-category retail-category-"+c.tone}><span className="retail-category-number">{String(i+1).padStart(2,"0")} / CATEGORIA</span>{preview?<img src={preview.image} alt="" loading="lazy" width="280" height="280"/>:<span className="retail-category-symbol" aria-hidden="true">✳</span>}<span className="retail-category-text"><strong>{c.name}</strong><small>{c.short}</small>{catalog.products.length>0&&<b>{found.length} {found.length===1?"produto":"produtos"}</b>}</span><span className="retail-category-arrow">↗</span></Link>})}</div></section>
 <section className="retail-featured"><div className="shell retail-section"><div className="retail-section-head"><div><span>CATÁLOGO OFICIAL DIVERSUAL</span><h2>Produtos em <em>destaque.</em></h2><p>Seleção de produtos reais disponíveis no catálogo do parceiro.</p></div><Link href="/catalogo">VER CATÁLOGO COMPLETO ↗</Link></div>
 {featured.length?<div className="real-product-grid retail-featured-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="retail-no-products">O catálogo está em atualização. Mostramos apenas artigos de parceiros autorizados.</div>}
 <p className="catalog-disclaimer">Links de afiliado. Preços finais, disponibilidade e envio são sempre confirmados na loja parceira.</p></div></section>
 <section className="shell retail-section retail-guides"><div className="retail-guides-intro"><span>PRIMEIRA COMPRA?</span><h2>NÃO SABES POR ONDE <em>COMEÇAR?</em></h2><p>Guia de materiais, cuidados e escolhas para a tua primeira compra.</p><Link className="retail-cta" href="/guias">VER GUIAS DE COMPRA ↗</Link></div><div className="retail-guide-links">{guides.map((g,i)=><Link key={g.slug} href={"/guias#"+g.slug}><span>{"0"+(i+1)}</span><strong>{g.title}</strong><b>↗</b></Link>)}</div></section>
 <div className="retail-bottom"><div className="shell"><div><span>SEVELORA · SEX SHOP ONLINE</span><h2>MENOS TABUS.<br/>MAIS DESCOBERTA.</h2></div><Link className="retail-cta" href="/catalogo">VER TODOS OS PRODUTOS ↗</Link></div></div>
 </>;
}
