"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {categories,subcategoryLabels} from "@/lib/sevelora-data";
import type {ProductCatalog} from "@/lib/sevelora-products";
import {ProductCard} from "./sevelora-product-card";

const fold=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-PT");
export default function Catalogue({catalog,initialCategory="todos",initialQuery="",initialType=""}:{catalog:ProductCatalog;initialCategory?:string;initialQuery?:string;initialType?:string}){
  const [query,setQuery]=useState(initialQuery);
  const [category,setCategory]=useState(initialCategory);
  const [type,setType]=useState(initialType);
  const [sort,setSort]=useState("original");
  const [limit,setLimit]=useState(24);
  const choices=categories.filter(c=>catalog.products.some(p=>p.categories.includes(c.slug))||c.slug===category);
  const typeChoices=useMemo(()=>{
    const options=new Map<string,number>();
    for(const p of catalog.products){
      if(category!=="todos"&&!p.categories.includes(category))continue;
      for(const typeId of p.subcategories||[])options.set(typeId,(options.get(typeId)||0)+1);
    }
    return [...options.entries()].sort((a,b)=>b[1]-a[1]).map(([id,count])=>({id,count,label:subcategoryLabels[id]||id}));
  },[catalog.products,category]);
  const filtered=useMemo(()=>{
    const term=fold(query.trim());
    let items=catalog.products.filter(p=>
      (category==="todos"||p.categories.includes(category))&&
      (!type||(p.subcategories||[]).includes(type))&&
      (!term||fold([p.name,p.description,p.brand].join(" ")).includes(term))
    );
    if(sort==="az")items=[...items].sort((a,b)=>a.name.localeCompare(b.name,"pt-PT"));
    if(sort==="price")items=[...items].sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
    return items;
  },[catalog.products,category,type,query,sort]);
  const chooseCategory=(slug:string)=>{setCategory(slug);setType("");setLimit(24);};
  const chooseType=(slug:string)=>{setType(slug);setLimit(24);};
  const reset=()=>{setQuery("");setCategory("todos");setType("");setLimit(24);};
  return <div className="shell catalog-layout">
    <aside className="filter-sidebar" aria-label="Categorias e filtros">
      <h2>SEX SHOP</h2><p className="sidebar-pretitle">ESCOLHE POR CATEGORIA</p>
      <button type="button" className={category==="todos"?"active":""} aria-pressed={category==="todos"} onClick={()=>chooseCategory("todos")}>Todos os produtos <span>{catalog.products.length}</span></button>
      {choices.map(c=><button type="button" key={c.slug} className={category===c.slug?"active":""} aria-pressed={category===c.slug} onClick={()=>chooseCategory(c.slug)}>{c.name}<span>{catalog.products.filter(p=>p.categories.includes(c.slug)).length}</span></button>)}
      {typeChoices.length>1&&<div className="subfilter-panel"><h3>TIPO DE PRODUTO</h3><button type="button" className={!type?"active":""} aria-pressed={!type} onClick={()=>chooseType("")}>Todos os tipos</button>{typeChoices.map(t=><button key={t.id} type="button" aria-pressed={type===t.id} className={type===t.id?"active":""} onClick={()=>chooseType(t.id)}>{t.label}<span>{t.count}</span></button>)}</div>}
      <p className="sidebar-note">Produtos classificados e descritos em português de Portugal. Preço e envio final confirmados na loja parceira.</p>
    </aside>
    <section className="catalog-content" aria-labelledby="catalog-title">
      <div className="catalog-intro"><span className="retail-kicker">SEX SHOP / CATÁLOGO</span><h1 id="catalog-title">Encontra o que procuras.</h1><p>Escolhe a categoria e o tipo de produto. Cada artigo está organizado pela sua função real.</p></div>
      <div className="catalog-toolbar"><label className="searchbox"><span aria-hidden="true">⌕</span><input type="search" aria-label="Pesquisar produtos" placeholder="Vibrador, sugador, massajador..." value={query} onChange={e=>{setQuery(e.target.value);setLimit(24);}}/></label><label className="sortbox">ORDENAR <select aria-label="Ordenar produtos" value={sort} onChange={e=>setSort(e.target.value)}><option value="original">Ordem do catálogo</option><option value="az">Nome A–Z</option>{catalog.products.some(p=>p.price!==null)&&<option value="price">Menor preço</option>}</select></label></div>
      <div className="mobile-filters"><label>ESCOLHER CATEGORIA <select aria-label="Filtrar por categoria" value={category} onChange={e=>chooseCategory(e.target.value)}><option value="todos">Todos os produtos</option>{choices.map(c=><option value={c.slug} key={c.slug}>{c.name}</option>)}</select></label>{typeChoices.length>1&&<label>TIPO DE PRODUTO <select aria-label="Filtrar por tipo" value={type} onChange={e=>chooseType(e.target.value)}><option value="">Todos os tipos</option>{typeChoices.map(t=><option key={t.id} value={t.id}>{t.label} ({t.count})</option>)}</select></label>}</div>
      {(query||category!=="todos"||type)&&<div className="retail-filter-active"><span>{category==="todos"?"Pesquisa":categories.find(c=>c.slug===category)?.name||"Categoria"}{type&&" · "+(subcategoryLabels[type]||type)}{query&&" · "+query}</span><button type="button" onClick={reset}>LIMPAR FILTROS ×</button></div>}
      <p className="results-label" role="status">{filtered.length} {filtered.length===1?"produto encontrado":"produtos encontrados"}{filtered.length>limit?" · a mostrar "+limit:""}</p>
      {catalog.stale?<div className="no-results"><h2>Catálogo em atualização.</h2><p>Aguardamos a sincronização do parceiro.</p></div>:filtered.length?<><div className="real-product-grid">{filtered.slice(0,limit).map(p=><ProductCard key={p.id} product={p}/>)}</div>{filtered.length>limit&&<button className="retail-more" type="button" onClick={()=>setLimit(n=>n+24)}>MOSTRAR MAIS PRODUTOS ({filtered.length-limit}) ↓</button>}</>:<div className="no-results"><h2>Não há artigos nesta seleção.</h2><p>Experimenta outro tipo ou uma categoria com produtos disponíveis.</p><button type="button" className="button button-dark" onClick={reset}>VER TODOS OS PRODUTOS</button></div>}
      <div className="catalog-bottom"><p>{catalog.updatedAt&&<>Catálogo atualizado em {new Date(catalog.updatedAt).toLocaleString("pt-PT",{timeZone:"Europe/Lisbon",dateStyle:"short",timeStyle:"short"})}. </>}Nomes e resumos adaptados para português de Portugal a partir dos dados oficiais da Diversual. Confirma preços, envio e especificações antes de comprar.</p><Link href="/afiliacao">INFORMAÇÃO DE AFILIAÇÃO ↗</Link></div>
    </section>
  </div>;
}
