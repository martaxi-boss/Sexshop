import type { MetadataRoute } from "next";
import { categories } from "@/lib/sevelora-data";
import { getCatalog } from "@/lib/sevelora-catalog-server";
import { matchesCategory } from "@/lib/sevelora-products";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  if(process.env.NEXT_PUBLIC_LAUNCH!=="true")return [];
  const base=process.env.NEXT_PUBLIC_SITE_URL??"https://sevelora.eu";
  const catalog=await getCatalog();
  const paths=["","/catalogo","/guias","/sobre","/afiliacao",
    ...categories.filter(c=>catalog.products.some(p=>matchesCategory(p,c.slug))).map(c=>`/categoria/${c.slug}`),
    ...catalog.products.map(p=>`/produto/${encodeURIComponent(p.id)}`)];
  return paths.map(path=>({url:base+path,changeFrequency:"weekly",priority:path===""?1:path.startsWith("/produto/")?0.6:0.7}));
}
