import Link from "next/link";
import type {Product} from "@/lib/sevelora-products";
import {euro} from "@/lib/sevelora-products";

export function ProductCard({product:p,priority=false}:{product:Product;priority?:boolean}){
 return <article className="real-product-card">
   <Link href={"/produto/"+p.id} className="real-product-image" aria-label={"Ver ficha de "+p.name}>
     <img src={p.image} alt={p.name} loading={priority?"eager":"lazy"} decoding="async" width="400" height="400"/>
   </Link>
   <div className="real-product-copy">
     <h3><Link href={"/produto/"+p.id}>{p.name}</Link></h3>
     <p className="product-price">{p.price!==null?euro(p.price):"Consultar preço na loja"}</p>
     {!p.inStock&&<p className="product-stock">Indisponível no parceiro</p>}
     <div className="product-card-actions">{p.inStock?
       <a className="button button-dark" href={p.affiliateUrl} rel="sponsored nofollow noopener" target="_blank" aria-label={"Ver "+p.name+" na Diversual, abre nova janela"}>Ver na loja ↗</a>:
       <Link className="product-detail-link" href={"/produto/"+p.id}>Ver ficha ↗</Link>}
     </div>
   </div>
 </article>;
}
