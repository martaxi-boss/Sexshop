import Link from 'next/link';
import type { Product } from '@/lib/sevelora-products';
import { euro } from '@/lib/sevelora-products';
export function ProductCard({product:p}:{product:Product}){
  return <article className="real-product-card"><Link href={`/produto/${p.id}`} className="real-product-image"><img src={p.image} alt={p.name} loading="lazy" width="400" height="400"/></Link><div className="real-product-copy"><span className="eyebrow">DIVERSUAL</span><h3><Link href={`/produto/${p.id}`}>{p.name}</Link></h3><p className="product-price">{p.price!==null?euro(p.price):'Preço na loja'}</p><p className="product-stock">{p.inStock?'Disponível no catálogo do parceiro':'Indisponível no parceiro'}</p><Link href={`/produto/${p.id}`} className="text-link">Ver detalhes ↗</Link>{p.inStock&&<a className="button button-dark" href={p.affiliateUrl} rel="sponsored nofollow noopener" target="_blank" aria-label={`Ver ${p.name} na Diversual (nova janela)`}>Ver na Diversual ↗</a>}</div></article>;
}
