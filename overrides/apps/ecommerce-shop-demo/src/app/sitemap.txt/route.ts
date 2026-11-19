import sitemap from "../sitemap";

// Both formats use the same live catalog and launch policy; no duplicate URL list.
export async function GET() {
  const urls = (await sitemap()).map(entry => entry.url);
  return new Response(urls.length ? urls.join("\n") + "\n" : "", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
