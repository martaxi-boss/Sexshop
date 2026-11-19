import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{
  const launch=process.env.NEXT_PUBLIC_LAUNCH==="true";
  return {rules:[{userAgent:"*",allow:launch?"/":undefined,disallow:launch?["/api/"]:["/"]}],sitemap:launch?(process.env.NEXT_PUBLIC_SITE_URL??"https://sevelora.eu")+"/sitemap.xml":undefined};
}
