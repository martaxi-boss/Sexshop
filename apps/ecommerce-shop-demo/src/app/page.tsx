import { getCatalog } from "@/lib/sevelora-catalog-server";
import { ProductCard } from "@/components/sevelora-product-card";
import Link from "next/link";
import { categories, guides } from "@/lib/sevelora-data";
import { DecorativeArt } from "@/components/sevelora-cards";

export default async function Home() {
  const catalog=await getCatalog();
  return <>
    <section className="hero shell">
      <div className="hero-text">
        <span className="eyebrow"><span className="line-mini"/> DESCOBRE O TEU UNIVERSO</span>
        <h1>O prazer de te <em>conhecer.</em></h1>
        <p>Uma forma simples, elegante e discreta de explorar o bem-estar íntimo. Encontra o que procuras ao teu ritmo, com informação clara e escolhas cuidadas.</p>
        <div className="hero-buttons"><Link className="button button-dark" href="/catalogo">Explorar catálogo <span aria-hidden="true">↗</span></Link><Link className="button button-ghost" href="/guias">Descobrir os guias <span aria-hidden="true">→</span></Link></div>
        <div className="hero-facts"><span>◦ Para todas as descobertas</span><span>◦ Sempre com discrição</span></div>
      </div>
      <div className="hero-art" role="img" aria-label="Composição editorial abstrata em tons vinho e rosa">
        <div className="hero-art-top"><span>SEVELORA</span><span>EST. 2026</span></div>
        <div className="hero-arch"/><div className="hero-orb"/><div className="hero-form"/><div className="hero-light"/>
        <span className="hero-art-caption">A beleza de explorar<br/>sem pressa.</span>
      </div>
    </section>
    <section className="benefit-bar"><div className="shell benefit-grid"><div><strong>01</strong><span>Escolhe com confiança<small>Informação útil, sem complicações.</small></span></div><div><strong>02</strong><span>Descobre por categorias<small>Encontra o que te interessa.</small></span></div><div><strong>03</strong><span>Compra com clareza<small>Pagamento na loja parceira.</small></span></div></div></section>
    <section className="shell section-block">
      <div className="heading-row"><div><span className="eyebrow">FEITO PARA SER SIMPLES</span><h2>Explora à tua maneira.</h2><p>Começa por uma categoria e segue a tua curiosidade.</p></div><Link className="text-link" href="/catalogo">Ver todas as categorias <span>↗</span></Link></div>
      <div className="category-grid">{categories.slice(0,6).map((c,i)=><Link key={c.slug} href={`/categoria/${c.slug}`} className={`category-tile tone-${c.tone}`}><div className="category-tile-art"><DecorativeArt type={c.symbol}/></div><div className="category-tile-text"><span>0{i+1} / COLEÇÃO</span><h3>{c.name}</h3><p>{c.short}</p></div><span className="tile-arrow" aria-hidden="true">↗</span></Link>)}</div>
    </section>
    <section className="editorial-section"><div className="shell editorial-grid"><div className="editorial-illustration"><div className="editorial-orbit"/><span>YOUR PACE.<br/>YOUR WAY.</span></div><div className="editorial-copy"><span className="eyebrow">PEQUENOS MOMENTOS, GRANDES DESCOBERTAS</span><h2>Um universo íntimo,<br/><em>sem tabus.</em></h2><p>Não precisas de saber exatamente o que procuras. Organizámos as coleções por interesses e preparámos guias para te ajudar a escolher com tranquilidade.</p><Link className="button button-outline" href="/guias">Ler os nossos guias <span>↗</span></Link></div></div></section>
    <section className="shell section-block">
      <div className="heading-row"><div><span className="eyebrow">UM CATÁLOGO QUE FAZ SENTIDO</span><h2>Encontra o teu ponto de partida.</h2><p>Seleções por tipo de produto, organizadas de forma intuitiva.</p></div><Link className="text-link" href="/catalogo">Explorar catálogo <span>↗</span></Link></div>
      <div className="real-product-grid">{catalog.products.slice(0,8).map(p=><ProductCard key={p.id} product={p}/>)}</div>
      <p className="catalog-disclaimer">Fotografias e produtos do catálogo oficial Diversual. Os links são de afiliado; compra e condições finais na loja parceira.</p>
    </section>
    <section className="guides-section shell section-block"><div className="heading-row"><div><span className="eyebrow">BEM-ESTAR TAMBÉM É CONHECIMENTO</span><h2>O guia para te sentires à vontade.</h2></div><Link href="/guias" className="text-link">Todos os guias <span>↗</span></Link></div><div className="guide-grid">{guides.map((g,i)=><Link href={`/guias#${g.slug}`} key={g.slug} className="guide-card"><span className="guide-number">0{i+1} / GUIA DE COMPRA</span><h3>{g.title}</h3><p>{g.summary}</p><span className="guide-end">{g.read} de leitura <span>↗</span></span></Link>)}</div></section>
    <section className="closing"><div className="shell closing-inner"><div><span className="eyebrow">SEVELORA</span><h2>À tua maneira.<br/><em>Ao teu ritmo.</em></h2></div><div><p>Acreditamos que explorar o teu bem-estar deve ser simples, reservado e sem julgamentos.</p><Link className="button button-light" href="/catalogo">Começar a explorar ↗</Link></div></div></section>
  </>;
}
