import type {Metadata,Viewport} from "next";
import Link from "next/link";
import {categories} from "@/lib/sevelora-data";
import {getCatalog} from "@/lib/sevelora-catalog-server";
import {matchesCategory} from "@/lib/sevelora-products";
import "./sevelora.css";
const canonical=process.env.NEXT_PUBLIC_SITE_URL??"https://sevelora.eu";
const launch=process.env.NEXT_PUBLIC_LAUNCH==="true";
export const metadata:Metadata={metadataBase:new URL(canonical),title:{default:"Sex Shop Online em Portugal | Sevelora",template:"%s | Sevelora"},description:"Sex shop para adultos em Portugal. Explora vibradores, sugadores, masturbadores, brinquedos a dois, BDSM e cuidados íntimos.",applicationName:"Sevelora",openGraph:{type:"website",locale:"pt_PT",siteName:"Sevelora"},robots:{index:launch,follow:launch},referrer:"strict-origin-when-cross-origin"};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#280a1c"};
const navSlugs=["estimuladores","anal","masturbadores","bem-estar"];
export default async function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  const catalog=await getCatalog();
  const shown=categories.filter(c=>!catalog.products.length||catalog.products.some(p=>matchesCategory(p,c.slug)));
  const shownProducts=shown.filter(c=>c.kind==="product");
  return <html lang="pt-PT"><body>
  <a className="skip" href="#conteudo">Saltar para conteúdo</a>
  <div className="topbar"><span>SEX SHOP ONLINE · PARA ADULTOS +18</span></div>
  <header className="header"><div className="header-inner">
    <Link className="brand" href="/" aria-label="Sevelora Sex Shop início"><img className="brand-mark" src="/brand/sevelora-mark.svg" width="36" height="36" alt=""/><span className="brand-wordmark">SEVELORA<small>SEX SHOP · PORTUGAL</small></span></Link>
    <nav className="desktop-nav" aria-label="Categorias principais">{shown.filter(c=>navSlugs.includes(c.slug)).map(c=><Link key={c.slug} href={"/categoria/"+c.slug}>{c.name}</Link>)}<Link href="/catalogo" className="nav-all">Ver catálogo</Link></nav>
    <div className="header-actions"><form className="header-search" action="/catalogo" method="get" role="search"><label className="sr-only" htmlFor="header-search">Pesquisar produtos</label><input id="header-search" type="search" name="q" placeholder="O que procuras?"/><button type="submit" aria-label="Pesquisar">⌕</button></form>
      <details className="mobile-menu"><summary aria-label="Abrir menu de categorias">☰ <span>MENU</span></summary><nav aria-label="Categorias no telemóvel"><Link href="/catalogo">TODOS OS PRODUTOS →</Link>{shownProducts.map(c=><Link key={c.slug} href={"/categoria/"+c.slug}>{c.name} →</Link>)}<Link href="/guias">Guias →</Link></nav></details></div>
  </div><form className="mobile-search" action="/catalogo" method="get" role="search"><label className="sr-only" htmlFor="mobile-search">Pesquisar produtos</label><input type="search" name="q" id="mobile-search" placeholder="Pesquisar sex toys e acessórios..."/><button type="submit">PROCURAR</button></form>
  </header>
  <main id="conteudo">{children}</main>
  <footer className="footer"><div className="footer-main">
    <div><Link href="/" className="footer-brand">SEVELORA ✦</Link><p>Uma sex shop para explorar sem tabus. Produtos reais de fornecedores parceiros aprovados, para maiores de 18 anos.</p><span className="footer-note">Montra de afiliação: não vendemos nem enviamos artigos diretamente.</span></div>
    <div><h3>SEX SHOP</h3><Link href="/catalogo">Todos os produtos</Link><Link href="/categoria/estimuladores">Vibradores & Dildos</Link><Link href="/categoria/masturbadores">Masturbadores</Link><Link href="/categoria/aneis">Anéis Penianos</Link><Link href="/categoria/casais">Brinquedos a Dois</Link></div>
    <div><h3>DESCOBRIR</h3><Link href="/categoria/anal">Prazer Anal</Link><Link href="/categoria/bdsm">BDSM & Fetiche</Link>{shownProducts.some(c=>c.slug==="feromonas")&&<Link href="/categoria/feromonas">Perfumes & Feromonas</Link>}<Link href="/categoria/bem-estar">Lubrificantes & Cuidados</Link><Link href="/guias">Guias</Link></div>
    <div><h3>INFORMAÇÃO</h3><a href="mailto:geral@sevelora.eu">geral@sevelora.eu</a><Link href="/sobre">Sobre a Sevelora</Link><Link href="/afiliacao">Como funciona a afiliação</Link><p>Preços finais, disponibilidade, portes e entregas são confirmados na loja parceira.</p></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Sevelora · Sex shop online em Portugal</span><span>+18 · Compra no parceiro · <Link href="/afiliacao">Transparência</Link></span></div></footer>
  </body></html>;
}
