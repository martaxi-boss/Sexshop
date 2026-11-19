import assert from "node:assert/strict";
const base = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const routes = [
  ["/","O TEU PRAZER."],
  ["/catalogo","Encontra o que procuras"],
  ["/categoria/estimuladores","Vibradores"],
  ["/categoria/masturbadores","Masturbadores"],
  ["/categoria/aneis","Anéis Penianos"],
  ["/categoria/casais","Brinquedos a Dois"],
  ["/categoria/bdsm","BDSM"],
  ["/categoria/anal","Prazer Anal"],
  ["/categoria/bem-estar","Lubrificantes"],
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
  if(path==="/"){
    for(const snippet of ["NA NOSSA MONTRA","DIVERSUAL / AFILIADO","retail-showcase","retail-trust","EXPLORA OS PRODUTOS","COMPRA NA LOJA PARCEIRA"]){
      assert.ok(!html.includes(snippet),"Crossed-out homepage module remains: "+snippet);
    }
    assert.ok(html.includes("ESCOLHER CATEGORIA"),"Hero category button should remain");
    assert.ok(html.includes("EXPLORA POR TIPO DE PRODUTO"),"Category section should remain");
    assert.ok(html.includes("CATÁLOGO OFICIAL DIVERSUAL"),"Other product section should remain");
  }
  if(path==="/"||path==="/catalogo"){
    for(const label of ["Explora à tua maneira","Para Ela","Para Ele","Para Casais"]){
      assert.ok(!html.includes(label),"Removed selection is still rendered: "+label);
    }
    assert.ok(!html.includes("/categoria/para-"),"Legacy audience links remain in site navigation");
  }
  console.log("PASS "+path+" [200, Sevelora, noindex]");
}
for(const slug of ["para-ela","para-ele","para-casais"]){
  const gone=await fetch(base+"/categoria/"+slug,{redirect:"manual"});
  assert.equal(gone.status,404,"Removed selection route must return 404: "+slug);
}
console.log("PASS three removed selection routes return 404");
const r404=await fetch(base+"/categorias/nao-existe");
assert.equal(r404.status,404);
console.log("PASS 404 invalid route");
const robots=await (await fetch(base+"/robots.txt")).text();
assert.ok(robots.includes("Disallow: /"),"Staging robots must disallow indexing");
console.log("PASS robots staging");
