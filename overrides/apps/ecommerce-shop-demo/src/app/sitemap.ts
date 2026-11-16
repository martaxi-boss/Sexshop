import type { MetadataRoute } from "next";
import { categories } from "@/lib/sevelora-data";
export default function sitemap():MetadataRoute.Sitemap{
  if(process.env.NEXT_PUBLIC_LAUNCH!=="true")return [];
  const base=process.env.NEXT_PUBLIC_SITE_URL??"https://sexy-shop.duckdns.org";
  return ["","/catalogo","/guias","/sobre","/afiliacao",...categories.map(c=>`/categoria/${c.slug}`)].map(path=>({url:base+path,changeFrequency:"weekly",priority:path===""?1:0.7}));
}
