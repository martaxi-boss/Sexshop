import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { categories } from "@/lib/sevelora-data";
import "./sevelora.css";

const canonical = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sexy-shop.duckdns.org";
const launch = process.env.NEXT_PUBLIC_LAUNCH === "true";
export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title: { default: "Sevelora | Bem-estar íntimo com discrição", template: "%s | Sevelora" },
  description: "Explora categorias e guias de bem-estar íntimo na Sevelora. Seleção editorial para adultos, com compra nas lojas parceiras.",
  applicationName: "Sevelora",
  openGraph: { type:"website", locale:"pt_PT", siteName:"Sevelora" },
  robots: { index: launch, follow: launch },
  referrer: "strict-origin-when-cross-origin",
};
export const viewport: Viewport = { width:"device-width", initialScale:1, themeColor:"#fbf7f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT">
    <body>
      <a className="skip" href="#conteudo">Saltar para conteúdo</a>
      <div className="topbar"><span>UMA SELEÇÃO PARA EXPLORAR COM NATURALIDADE</span><span>PORTUGAL <span aria-hidden="true">·</span> +18</span></div>
      <header className="header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Sevelora, página inicial"><span className="brand-mark" aria-hidden="true">◌</span><span>sevelora<small>INTIMATE WELLNESS</small></span></Link>
          <nav className="desktop-nav" aria-label="Categorias principais">
            <Link href="/catalogo">Todos os produtos</Link>
            <Link href="/categoria/para-ela">Para Ela</Link>
            <Link href="/categoria/para-ele">Para Ele</Link>
            <Link href="/categoria/para-casais">Para Casais</Link>
            <Link href="/categoria/bem-estar">Bem-estar</Link>
            <Link href="/guias">Guias</Link>
          </nav>
          <div className="header-actions">
            <Link className="search-link" href="/catalogo" aria-label="Pesquisar no catálogo"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m16 16 5 5"/></svg><span>Pesquisar</span></Link>
            <details className="mobile-menu"><summary aria-label="Abrir menu"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 7h18M3 12h18M3 17h18"/></svg></summary><nav aria-label="Menu móvel"><Link href="/catalogo">Explorar catálogo</Link>{categories.map(c=><Link key={c.slug} href={`/categoria/${c.slug}`}>{c.name}</Link>)}<Link href="/guias">Guias</Link></nav></details>
          </div>
        </div>
        <nav className="category-strip" aria-label="Todas as categorias"><div>{categories.map(c=><Link key={c.slug} href={`/categoria/${c.slug}`}>{c.name}</Link>)}</div></nav>
      </header>
      <main id="conteudo">{children}</main>
      <footer className="footer">
        <div className="footer-main">
          <div><Link className="footer-brand" href="/">sevelora</Link><p>Um espaço para descobrir bem-estar íntimo, com respeito, informação e discrição.</p><span className="footer-note">Uma montra editorial para maiores de 18 anos.</span></div>
          <div><h3>Explorar</h3><Link href="/catalogo">Catálogo</Link><Link href="/categoria/para-ela">Para Ela</Link><Link href="/categoria/para-ele">Para Ele</Link><Link href="/categoria/para-casais">Para Casais</Link></div>
          <div><h3>Informação</h3><Link href="/guias">Guias</Link><Link href="/sobre">Sobre a Sevelora</Link><Link href="/afiliacao">Transparência e afiliação</Link></div>
          <div><h3>Como funciona</h3><p>Exploras os produtos aqui e efetuas a compra diretamente na Diversual através dos nossos links de afiliado.</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Sevelora — Projeto em testes</span><span>18+ · Compra e envio realizados pelo parceiro · <Link href="/afiliacao">Informação de afiliação</Link></span></div>
      </footer>
    </body>
  </html>;
}
