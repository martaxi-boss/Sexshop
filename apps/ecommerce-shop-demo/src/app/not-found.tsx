import Link from "next/link";
export default function NotFound(){return <div className="shell info-page"><span className="eyebrow">PÁGINA NÃO ENCONTRADA</span><h1>Um desvio<br/><em>no caminho.</em></h1><p>Esta página não existe. Podes voltar ao início ou explorar o nosso catálogo.</p><Link className="button button-dark" href="/catalogo">Explorar catálogo ↗</Link></div>}
