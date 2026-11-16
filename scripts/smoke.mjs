import assert from "node:assert/strict";
const base = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const routes = [
  ["/","O prazer de te"],
  ["/catalogo","Encontra o que procuras"],
  ["/categoria/para-ela","Para Ela"],
  ["/categoria/para-ele","Para Ele"],
  ["/categoria/para-casais","Para Casais"],
  ["/categoria/bem-estar","Bem-estar"],
  ["/guias","Descobrir é natural"],
  ["/sobre","sem complicações"],
  ["/afiliacao","Como funciona"]
];
for (const [path,needle] of routes) {
  const response = await fetch(base+path,{redirect:"manual"});
  assert.equal(response.status,200,"GET "+path+": "+response.status);
  const html=await response.text();
  assert.ok(html.includes(needle),"Missing content in "+path+": "+needle);
  assert.ok(!html.includes("DemoShop Nuvi"),"Old brand leaked in "+path);
  assert.ok(!html.includes("Secure checkout"),"Checkout leaked in "+path);
  assert.ok(!html.includes("venturefield-jacket"),"Old product leaked in "+path);
  assert.ok(/noindex/i.test(html),"Staging page indexable: "+path);
  console.log("PASS "+path+" [200, Sevelora, noindex]");
}
const r404=await fetch(base+"/categorias/nao-existe");
assert.equal(r404.status,404);
console.log("PASS 404 invalid route");
const robots=await (await fetch(base+"/robots.txt")).text();
assert.ok(robots.includes("Disallow: /"),"Staging robots must disallow indexing");
console.log("PASS robots staging");
