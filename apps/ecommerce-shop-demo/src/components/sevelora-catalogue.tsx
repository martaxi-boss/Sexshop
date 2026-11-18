"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import {categories} from "@/lib/sevelora-data";
import type {ProductCatalog} from "@/lib/sevelora-products";
import {ProductCard} from "./sevelora-product-card";
const fold=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-PT");
export default function Catalogue({catalog,initialCategory="todos",initialQuery=""}:{catalog:ProductCatalog;initialCategory?:string;initialQuery?:string}){
  const [query,setQuery]=useState(initialQuery),[category,setCategory]=useState(initialCategory),[sort,setSort]=useState("original"),[limit,setLimit]=useState(24);
  const options=categories.filter(c=>catalog.products.some(p=>p.categories.includes(c.slug))||c.slug===category);
  const choices=options.length?options:categories;
  const filtered=useMemo(()=>{
    let items=catalog.products.filter(p=>(category==="todos"||p.categories.includes(category))&&fold([p.name,p.description,p.brand].join(" ")).includes(fold(query.trim())));
    if(sort==="az")items=[...items].sort((a,b)=>a.name.localeCompare(b.name,"pt-PT"));
    if(sort==="price")items=[...items].sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
    return items;
  },[catalog.products,category,query,sort]);
  const choose=(slug:string)=>{setCategory(slug);setLimit(24);};
  return <div className="shell catalog-layout"><aside className="filter-sidebar" aria-label="Categorias e filtros">
    <h2>SEX SHOP</h2><p className="sidebar-pretitle">ESCOLHE POR CATEGORIA</p>
    <button className={category==="todos"?"active":""} aria-pressed={category==="todos"} onClick={()=>choose("todos")} type="button">Todos os produtos <span>{catalog.products.length}</span></button>
    {choices.map(c=><button type="button" key={c.slug} className={category===c.slug?"active":""} aria-pressed={category===c.slug} onClick={()=>choose(c.slug)}>{c.name}<span>{catalog.products.filter(p=>p.categories.includes(c.slug)).length}</span></button>)}
    <p className="sidebar-note">Informação e imagens do catálogo oficial Diversual. Preço e envio são confirmados na loja parceira.</p>
  </aside><section className="catalog-content" aria-labelledby="catalog-title">
    <div className="catalog-intro"><span className="retail-kicker">SEX SHOP / TODOS OS PRODUTOS</span><h1 id="catalog-title">Encontra o que procuras.</h1><p>Pesquisa o tipo de artigo ou escolhe uma categoria. Filtra sem complicações.</p></div>
    <div className="catalog-toolbar"><label className="searchbox"><span aria-hidden="true">⌕</span><input type="search" aria-label="Pesquisar produtos" placeholder="Vibrador, succionador, masajeador..." value={query} onChange={e=>{setQuery(e.target.value);setLimit(24)}}/></label><label className="sortbox">ORDENAR <select aria-label="Ordenar produtos" value={sort} onChange={e=>setSort(e.target.value)}><option value="original">Ordem do catálogo</option><option value="az">Nome A–Z</option>{catalog.products.some(p=>p.price!==null)&&<option value="price">Menor preço</option>}</select></label></div>
    <div className="mobile-filters"><label>ESCOLHER CATEGORIA <select aria-label="Filtrar por categoria" value={category} onChange={e=>choose(e.target.value)}><option value="todos">Todos os produtos</option>{choices.map(c=><option value={c.slug} key={c.slug}>{c.name}</option>)}</select></label></div>
    {(query||category!=="todos")&&<div className="retail-filter-active"><span>{category==="todos"?"Pesquisa":categories.find(c=>c.slug===category)?.name||"Categoria"}{query&&" · "+query}</span><button type="button" onClick={()=>{setQuery("");choose("todos")}}>LIMPAR FILTROS ×</button></div>}
    <p className="results-label" role="status">{filtered.length} {filtered.length===1?"produto encontrado":"produtos encontrados"}{filtered.length>limit?" · a mostrar "+limit:""}</p>
    {catalog.stale?<div className="no-results"><h2>Catálogo em atualização.</h2><p>Estamos a aguardar dados atuais do parceiro.</p></div>:filtered.length?<><div className="real-product-grid">{filtered.slice(0,limit).map(p=><ProductCard key={p.id} product={p}/>)}</div>{filtered.length>limit&&<button className="retail-more" type="button" onClick={()=>setLimit(n=>n+24)}>MOSTRAR MAIS PRODUTOS ({filtered.length-limit}) ↓</button>}</>:<div className="no-results"><h2>Não há artigos nesta seleção.</h2><p>Experimenta outro termo ou explora as categorias disponíveis.</p><button type="button" className="button button-dark" onClick={()=>{setQuery("");choose("todos")}}>VER TODOS OS PRODUTOS</button></div>}
    <div className="catalog-bottom"><p>{catalog.updatedAt&&<>Catálogo atualizado em {new Date(catalog.updatedAt).toLocaleString("pt-PT",{timeZone:"Europe/Lisbon",dateStyle:"short",timeStyle:"short"})}. </>}Nomes e descrições do fornecedor em espanhol. Confirma preço, envio e disponibilidade na loja parceira.</p><Link href="/afiliacao">INFORMAÇÃO DE AFILIAÇÃO ↗</Link></div>
  </section></div>;
}
