import Link from "next/link";
import type {Product} from "@/lib/sevelora-products";
import {euro} from "@/lib/sevelora-products";
export function ProductCard({product:p}:{product:Product}){
 return <article className="real-product-card"><Link href={"/produto/"+p.id} className="real-product-image" aria-label={"Ver "+p.name}><span className="product-chip">DIVERSUAL · AFILIADO</span><img src={p.image} alt={p.name} loading="lazy" width="400" height="400"/></Link>
 <div className="real-product-copy"><span className="product-brand">{p.brand||"Diversual"}</span><h3><Link href={"/produto/"+p.id}>{p.name}</Link></h3><p className="product-price">{p.price!==null?euro(p.price):"VER PREÇO NA LOJA"}</p><p className="product-stock">{p.inStock?"Disponível no catálogo do parceiro":"Indisponível no parceiro"}</p>
 <div className="product-card-actions"><Link href={"/produto/"+p.id} className="product-detail-link">VER FICHA →</Link>{p.inStock&&<a className="button button-dark" href={p.affiliateUrl} rel="sponsored nofollow noopener" target="_blank" aria-label={"Ver "+p.name+" na Diversual, abre nova janela"}>VER NA LOJA ↗</a>}</div></div></article>;
}
