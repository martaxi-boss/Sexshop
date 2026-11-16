import type { Metadata } from "next";
import Catalogue from "@/components/sevelora-catalogue";
export const metadata: Metadata = {title:"Catálogo",description:"Explora categorias de bem-estar íntimo: Para Ela, Para Ele, Para Casais, lingerie, massagem e acessórios."};
export default function CatalogoPage(){return <><div className="breadcrumb shell"><a href="/">Início</a><span>/</span><strong>Catálogo</strong></div><Catalogue/></>;}
