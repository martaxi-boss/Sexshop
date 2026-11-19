import Link from "next/link";
import type { collections } from "@/lib/sevelora-data";

export function DecorativeArt({type}: {type:string}) {
  const common = {fill:"none",stroke:"currentColor",strokeWidth:1.2,strokeLinecap:"round" as const,strokeLinejoin:"round" as const};
  return <svg className="abstract-art" viewBox="0 0 220 220" role="presentation" aria-hidden="true">
    <circle cx="110" cy="110" r="88" fill="currentColor" opacity=".055"/>
    {type==="petal" && <><path {...common} d="M111 165c-26-22-48-51-45-82 4-33 43-38 49-7 8-32 46-25 47 6 2 31-23 60-51 83Z"/><path {...common} d="M111 165c0-36 1-63 4-89"/></>}
    {type==="wave" && <>{[0,1,2,3].map(i=><path key={i} {...common} d={`M 36 ${75+i*23} C 75 ${32+i*23}, 115 ${120+i*23}, 181 ${77+i*23}`}/>)}</>}
    {type==="rings" && <><circle {...common} cx="89" cy="106" r="45"/><circle {...common} cx="132" cy="114" r="45"/><path {...common} d="M111 65v97"/></>}
    {type==="ripple" && <>{[29,48,66,84].map(r=><circle key={r} {...common} cx="110" cy="111" r={r}/>)}</>}
    {type==="fabric" && <><path {...common} d="M63 48c31 17 57 17 88 0l14 127c-34-17-69-17-105 0L63 48Z"/><path {...common} d="M77 62c22 11 44 12 64 2m-61 42c24 11 43 11 62 2m-61 40c24-10 43-8 64 0"/></>}
    {type==="leaf" && <><path {...common} d="M110 173C43 153 41 69 173 47c-9 78-27 113-63 126Z"/><path {...common} d="M69 149c31-29 49-47 88-84"/></>}
    {type==="sun" && <><circle {...common} cx="110" cy="110" r="43"/>{Array.from({length:12},(_,i)=><path key={i} {...common} transform={`rotate(${i*30} 110 110)`} d="M110 40v20"/>)}</>}
    {type==="spark" && <><path {...common} d="m110 28 18 61 64 21-64 19-18 64-19-64-63-19 63-21 19-61Z"/><circle {...common} cx="168" cy="52" r="12"/><circle {...common} cx="52" cy="171" r="7"/></>}
  </svg>;
}

type Item = (typeof collections)[number];
export function CollectionCard({item,index}: {item:Item,index:number}) {
  return <Link href={`/categoria/${item.category}`} className="collection-card" aria-label={`Explorar ${item.name}`}>
    <div className={`collection-visual tone-${item.tone}`}><DecorativeArt type={item.symbol}/><span className="collection-chip">SELEÇÃO {String(index+1).padStart(2,"0")}</span></div>
    <div className="collection-body"><span className="collection-type">{item.categoryName}</span><h3>{item.name}</h3><p>{item.subtitle}</p><span className="collection-cta">Ver seleção <span aria-hidden="true">↗</span></span></div>
  </Link>;
}
