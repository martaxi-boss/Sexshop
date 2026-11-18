import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCatalog } from '@/lib/sevelora-catalog-server';
import { euro } from '@/lib/sevelora-products';
export const metadata={title:'Produto Diversual'};
export default async function ProductPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const catalog=await getCatalog();const p=catalog.products.find(p=>p.id===id);if(!p)notFound();
  return <><div className="breadcrumb shell"><Link href="/">Início</Link><span>/</span><Link href="/catalogo">Catálogo</Link><span>/</span><strong>{p.name}</strong></div><section className="shell product-detail"><div className="detail-image"><img src={p.image} alt={p.name} width="600" height="600"/></div><div><span className="eyebrow">DIVERSUAL · LINK DE AFILIADO</span><h1>{p.name}</h1><p className="product-price">{p.price!==null?euro(p.price):'Consultar preço na Diversual'}</p><p>{p.inStock?'Disponível no catálogo do parceiro.':'Indisponível no catálogo do parceiro.'}</p><h2>Sobre este produto</h2><p lang="es">{p.description}</p><small>Descrição original do fornecedor em espanhol.</small>{p.inStock&&<p><a className="button button-dark" href={p.affiliateUrl} rel="sponsored nofollow noopener" target="_blank">Ver na Diversual ↗</a></p>}<p>Compra e pagamento realizados na Diversual. Confirma o preço final, o envio para Portugal, os portes e as condições de devolução antes de comprar.</p><Link href="/afiliacao" className="text-link">Informação de afiliação ↗</Link></div></section></>;
}
