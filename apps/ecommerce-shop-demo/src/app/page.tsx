import Link from "next/link";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {productCategories} from "@/lib/sevelora-data";
import {matchesCategory} from "@/lib/sevelora-products";
import {ProductCard} from "@/components/sevelora-product-card";

export default async function Home(){
 const catalog=await getCatalog();
 const available=catalog.products.filter(p=>p.inStock);
 const featured=available.slice(0,4);
 const shown=productCategories.filter(c=>!catalog.products.length||catalog.products.some(p=>matchesCategory(p,c.slug)));
 return <>
  <section className="retail-hero"><div className="shell retail-hero-inner"><div className="retail-copy">
    <span className="retail-eyebrow">SEX SHOP ONLINE · PORTUGAL · +18</span>
    <h1>O TEU PRAZER.<br/><strong>AS TUAS REGRAS<span>.</span></strong></h1>
    <p>Descobre produtos íntimos com preços visíveis, categorias bem organizadas e compra segura na loja parceira.</p>
    <div className="retail-actions"><Link href="/catalogo" className="retail-cta">Explorar produtos ↗</Link><Link href="#categorias" className="retail-cta-ghost">Ver categorias ↓</Link></div>
  </div></div></section>

  <section className="shell retail-section retail-section-categories" id="categorias" aria-labelledby="home-categories">
    <div className="retail-section-head">
      <div><h2 id="home-categories">Escolhe uma categoria</h2><p>Encontra rapidamente o tipo de produto que procuras.</p></div>
      <Link href="/catalogo">Ver catálogo completo ↗</Link>
    </div>
    <div className="retail-categories retail-category-gallery">
    {shown.map(c=>{
      const found=catalog.products.filter(p=>matchesCategory(p,c.slug));
      const ids="coverIds" in c?c.coverIds:[];
      const preferred=ids.find(id=>found.some(p=>p.id===id&&p.inStock));
      const fallback=ids.find(id=>found.some(p=>p.id===id));
      const preview=found.find(p=>p.id===preferred)||found.find(p=>p.id===fallback)||found.find(p=>p.inStock)||found[0];
      return <Link key={c.slug} href={"/categoria/"+c.slug} className="retail-photo-card" aria-label={c.name+", "+found.length+" artigos"}>
        <div className={"retail-photo-panel retail-photo-panel-"+c.tone}>
          {preview?<img src={preview.image} alt={preview.name} loading="eager" decoding="async" width="320" height="280"/>:<span className="retail-photo-empty" aria-hidden="true">✦</span>}
        </div>
        <div className="retail-photo-details">
          <h3>{c.name}</h3>
          <div className="retail-photo-meta"><span>{found.length} {found.length===1?"artigo":"artigos"}</span><span aria-hidden="true">↗</span></div>
        </div>
      </Link>;
    })}
    </div>
  </section>

  <section className="retail-featured"><div className="shell retail-section">
    <div className="retail-section-head"><div><h2>Em destaque</h2><p>Uma pequena seleção do catálogo disponível.</p></div><Link href="/catalogo">Ver todos os produtos ↗</Link></div>
    {featured.length?<div className="real-product-grid retail-featured-grid">{featured.map(p=><ProductCard key={p.id} product={p} priority/>)}</div>:<div className="retail-no-products">O catálogo está em atualização. Mostramos apenas artigos de parceiros autorizados.</div>}
    <p className="catalog-disclaimer">Os preços, portes e disponibilidade finais são confirmados na Diversual. Os links são de afiliado.</p>
  </div></section>

  <section className="shell retail-help" aria-labelledby="help-title">
    <div><span>COMEÇAR É SIMPLES</span><h2 id="help-title">Precisas de uma orientação?</h2><p>Consulta os guias de materiais, utilização e compras discretas.</p></div>
    <Link className="retail-cta" href="/guias">Ver guias de compra ↗</Link>
  </section>
 </>;
}
