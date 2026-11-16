"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { categories, collections } from "@/lib/sevelora-data";
import { CollectionCard } from "@/components/sevelora-cards";
export default function Catalogue() {
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("todos");
  const [sort,setSort]=useState("original");
  const filtered=useMemo(()=>{
    let items=collections.filter(c=>(category==="todos"||c.category===category) && [c.name,c.subtitle,c.categoryName].join(" ").toLocaleLowerCase("pt-PT").includes(query.trim().toLocaleLowerCase("pt-PT")));
    if(sort==="az") items=[...items].sort((a,b)=>a.name.localeCompare(b.name,"pt-PT"));
    return items;
  },[category,query,sort]);
  return <div className="shell catalog-layout">
    <aside className="filter-sidebar" aria-label="Filtros do catálogo">
      <h2>Explorar</h2><button onClick={()=>setCategory("todos")} className={category==="todos"?"active":""} aria-pressed={category==="todos"}>Todas as categorias <span>{collections.length}</span></button>
      {categories.map(c=><button key={c.slug} onClick={()=>setCategory(c.slug)} className={category===c.slug?"active":""} aria-pressed={category===c.slug}>{c.name}<span>{collections.filter(x=>x.category===c.slug).length}</span></button>)}
      <p className="sidebar-note">As fichas dos fornecedores e os preços serão adicionados após aprovação das parcerias.</p>
    </aside>
    <section className="catalog-content" aria-labelledby="catalog-title">
      <div className="catalog-intro"><span className="eyebrow">DESCUBRA A SUA COLEÇÃO</span><h1 id="catalog-title">Encontra o que procuras.</h1><p>Explora as nossas seleções por interesse ou categoria. Sem complicações.</p></div>
      <div className="catalog-toolbar"><label className="searchbox"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input aria-label="Pesquisar coleções" type="search" placeholder="Pesquisar coleções..." value={query} onChange={e=>setQuery(e.target.value)}/></label><label className="sortbox">Ordenar <select aria-label="Ordenar coleções" value={sort} onChange={e=>setSort(e.target.value)}><option value="original">Em destaque</option><option value="az">A — Z</option></select></label></div>
      <div className="mobile-filters"><label>Categoria <select aria-label="Filtrar por categoria" value={category} onChange={e=>setCategory(e.target.value)}><option value="todos">Todas</option>{categories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select></label></div>
      <p className="results-label">{filtered.length} {filtered.length===1?"seleção":"seleções"} encontradas</p>
      {filtered.length ? <div className="collection-grid catalog-grid">{filtered.map((item,i)=><CollectionCard key={item.name} item={item} index={i}/>)}</div>:<div className="no-results"><h2>Não encontramos esta seleção.</h2><p>Experimenta outra palavra ou escolhe uma categoria.</p><button className="button button-dark" onClick={()=>{setQuery("");setCategory("todos");}}>Limpar pesquisa</button></div>}
      <div className="catalog-bottom"><p>Este é um catálogo de demonstração por famílias de produtos. Não são ofertas de venda.</p><Link href="/afiliacao">Como funcionam os links de afiliados ↗</Link></div>
    </section>
  </div>;
}
