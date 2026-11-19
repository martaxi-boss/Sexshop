import Link from "next/link";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {productCategories,guides} from "@/lib/sevelora-data";
import {matchesCategory} from "@/lib/sevelora-products";
import {ProductCard} from "@/components/sevelora-product-card";
export default async function Home(){
 const catalog=await getCatalog(),available=catalog.products.filter(p=>p.inStock);
 const hero=available.slice(0,2),featured=available.slice(0,8);
 const shown=productCategories.filter(c=>!catalog.products.length||catalog.products.some(p=>matchesCategory(p,c.slug)));
 return <>
 <section className="retail-hero"><div className="shell retail-hero-inner">
 <div className="retail-copy"><span className="retail-eyebrow">✦ SEX SHOP ONLINE · +18 · PORTUGAL</span><h1>O TEU PRAZER.<br/><strong>AS TUAS REGRAS<span>.</span></strong></h1><p>Vibradores, sugadores, masturbadores, lubrificantes e muito mais. Uma sex shop com categorias claras, produtos reais e liberdade para explorar.</p>
 <div className="retail-actions"><Link href="/catalogo" className="retail-cta">EXPLORAR SEX SHOP ↗</Link><Link href="#categorias" className="retail-cta-ghost">ESCOLHER CATEGORIA ↓</Link></div><div className="retail-hero-notes"><span>+18 / PARA ADULTOS</span><span>COMPRA NO PARCEIRO</span></div></div>
 <div className="retail-showcase"><div className="retail-showcase-head"><span>NA NOSSA MONTRA</span><strong>DIVERSUAL / AFILIADO</strong></div>
 {hero.length?<div className="retail-showcase-products">{hero.map(p=><Link key={p.id} href={"/produto/"+p.id} className="retail-showcase-item"><span><img src={p.image} width="350" height="350" alt={p.name}/></span><strong>{p.name}</strong><b>VER PRODUTO ↗</b></Link>)}</div>:<Link className="retail-showcase-fallback" href="/catalogo">VIBRADORES<br/>LUBRIFICANTES<br/>BDSM <small>EXPLORAR CATÁLOGO ↗</small></Link>}
 <small>Fotografias oficiais do fornecedor parceiro.</small></div></div></section>
 <div className="retail-trust"><div className="shell"><span><b>01 /</b> ESCOLHE A CATEGORIA</span><span><b>02 /</b> EXPLORA OS PRODUTOS</span><span><b>03 /</b> COMPRA NA LOJA PARCEIRA</span></div></div>
 <section className="shell retail-section" id="categorias">
  <div className="retail-section-head"><div><span>EXPLORA POR TIPO DE PRODUTO</span><h2>Encontra a categoria <em>certa.</em></h2><p>Escolhe a família certa: vibradores, plugs, masturbadores, lubrificantes e muito mais.</p></div><Link href="/catalogo">TODOS OS ARTIGOS ↗</Link></div>
  <div className="retail-categories retail-category-gallery">
  {shown.map((c,i)=>{
    const found=catalog.products.filter(p=>matchesCategory(p,c.slug));
    const ids="coverIds" in c?c.coverIds:[];
    const preferred=ids.find(id=>found.some(p=>p.id===id&&p.inStock));
    const fallback=ids.find(id=>found.some(p=>p.id===id));
    const preview=found.find(p=>p.id===preferred)||found.find(p=>p.id===fallback)||found.find(p=>p.inStock)||found[0];
    return <Link key={c.slug} href={"/categoria/"+c.slug} className="retail-photo-card">
      <div className={"retail-photo-panel retail-photo-panel-"+c.tone}>
      {preview?<img src={preview.image} alt={"Exemplo: "+preview.name} loading="lazy" width="320" height="280"/>:<span className="retail-photo-empty" aria-hidden="true">✦</span>}
      <span className="retail-photo-badge">CATEGORIA {String(i+1).padStart(2,"0")}</span>
      </div>
      <div className="retail-photo-details">
      <span className="retail-photo-topline"><span>{found.length>0?found.length+" "+(found.length===1?"produto":"produtos"):"EM PREPARAÇÃO"}</span><span className="retail-photo-arrow" aria-hidden="true">↗</span></span>
      <h3>{c.name}</h3><p>{c.short}</p>
      </div>
    </Link>;
  })}
  </div>
 </section>
 <section className="retail-featured"><div className="shell retail-section"><div className="retail-section-head"><div><span>CATÁLOGO OFICIAL DIVERSUAL</span><h2>Produtos em <em>destaque.</em></h2><p>Seleção de produtos reais disponíveis no catálogo do parceiro.</p></div><Link href="/catalogo">VER CATÁLOGO COMPLETO ↗</Link></div>
 {featured.length?<div className="real-product-grid retail-featured-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="retail-no-products">O catálogo está em atualização. Mostramos apenas artigos de parceiros autorizados.</div>}
 <p className="catalog-disclaimer">Links de afiliado. Preços finais, disponibilidade e envio são sempre confirmados na loja parceira.</p></div></section>
 <section className="shell retail-section retail-guides"><div className="retail-guides-intro"><span>PRIMEIRA COMPRA?</span><h2>NÃO SABES POR ONDE <em>COMEÇAR?</em></h2><p>Guia de materiais, cuidados e escolhas para a tua primeira compra.</p><Link className="retail-cta" href="/guias">VER GUIAS DE COMPRA ↗</Link></div><div className="retail-guide-links">{guides.map((g,i)=><Link key={g.slug} href={"/guias#"+g.slug}><span>{"0"+(i+1)}</span><strong>{g.title}</strong><b>↗</b></Link>)}</div></section>
 <div className="retail-bottom"><div className="shell"><div><span>SEVELORA · SEX SHOP ONLINE</span><h2>MENOS TABUS.<br/>MAIS DESCOBERTA.</h2></div><Link className="retail-cta" href="/catalogo">VER TODOS OS PRODUTOS ↗</Link></div></div>
 </>;
}
