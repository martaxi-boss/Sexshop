export const pageSize = 24;
export const pageNumber = (value: unknown): number =>
  typeof value === "string" && /^[1-9]\d{0,5}$/.test(value) ? Number(value) : 1;

export function catalogueHref(page: number, category = "todos", query = "", type = "") {
  const filtered = Boolean(query || type);
  const path = category === "todos" || filtered ? "/catalogo" : "/categoria/" + encodeURIComponent(category);
  const params = new URLSearchParams();
  if (filtered && category !== "todos") params.set("categoria", category);
  if (query) params.set("q", query);
  if (type) params.set("tipo", type);
  if (page > 1) params.set("pagina", String(page));
  return path + (params.size ? "?" + params.toString() : "");
}
