// Montra Sevelora: separar o QUE É (categoria única) de PARA QUEM (seleção transversal).
// Fotografias das categorias: somente IDs concretos de produtos da categoria, nunca o primeiro aleatório.
export const categories=[
 {slug:"para-ela",kind:"audience",name:"Para Ela",short:"Escolhas de prazer íntimo feminino",line:"Uma seleção por destinatário, reunindo diferentes tipos de produtos para ela.",tone:"rose",filters:[{label:"Vibradores tipo coelhinho",type:"rabbits"},{label:"Sugadores",type:"sugadores"},{label:"Vibradores compactos",type:"vibradores-compactos"},{label:"Bolas de Kegel",type:"kegel"}]},
 {slug:"para-ele",kind:"audience",name:"Para Ele",short:"Masturbadores, anéis e próstata",line:"Uma seleção por destinatário, com masturbadores, anéis e estimuladores prostáticos.",tone:"stone",filters:[{label:"Masturbadores",type:"masturbadores"},{label:"Anéis penianos",type:"aneis"},{label:"Estimuladores da próstata",type:"prostata"}]},
 {slug:"para-casais",kind:"audience",name:"Para Casais",short:"Brinquedos e experiências a dois",line:"Uma seleção para explorar a dois: acessórios, vibradores para casais e kits.",tone:"wine",filters:[{label:"Vibradores para casais",type:"vibradores-casais"},{label:"Strap-ons",type:"strap-ons"},{label:"Kits eróticos",type:"kits"},{label:"Ovos com comando",type:"ovos"}]},
 {slug:"estimuladores",kind:"product",name:"Vibradores & Dildos",short:"Coelhinhos, balas, sugadores e dildos",line:"Vibradores, dildos e estimuladores, agrupados pelo tipo de brinquedo.",tone:"lilac",coverIds:["34454438101","39096594352"],filters:[{label:"Coelhinhos",type:"rabbits"},{label:"Vibradores",type:"vibradores"},{label:"Vibradores compactos",type:"vibradores-compactos"},{label:"Sugadores",type:"sugadores"},{label:"Dildos",type:"dildos"},{label:"Ovos",type:"ovos"},{label:"Estimulação oral",type:"estimulacao-oral"}]},
 {slug:"anal",kind:"product",name:"Prazer Anal",short:"Plugs, bolas, próstata e higiene anal",line:"Apenas produtos específicos para prazer e higiene anal.",tone:"sand",coverIds:["43582237884","45279704377"],filters:[{label:"Plugs anais",type:"plugs"},{label:"Bolas anais",type:"bolas-anais"},{label:"Próstata",type:"prostata"},{label:"Higiene anal",type:"higiene-anal"},{label:"Kits anais",type:"kits-anal"},{label:"Vibradores anais",type:"vibradores-anais"}]},
 {slug:"masturbadores",kind:"product",name:"Masturbadores",short:"Modelos manuais e automáticos",line:"Masturbadores masculinos manuais e automáticos, sem produtos de outras famílias.",tone:"stone",coverIds:["43582237885","40148294052"],filters:[{label:"Masturbadores masculinos",type:"masturbadores"}]},
 {slug:"aneis",kind:"product",name:"Anéis Penianos",short:"Anéis vibratórios e ajustáveis",line:"Anéis penianos e anéis de estimulação a dois.",tone:"peach",coverIds:["45520166949","42519444179"],filters:[{label:"Anéis penianos",type:"aneis"}]},
 {slug:"casais",kind:"product",name:"Brinquedos a Dois",short:"Vibradores para casais e strap-ons",line:"Brinquedos especificamente concebidos para utilização a dois, incluindo arneses e strap-ons.",tone:"wine",coverIds:["43396308152","37160044645"],filters:[{label:"Vibradores para casais",type:"vibradores-casais"},{label:"Arneses",type:"arneses"},{label:"Strap-ons",type:"strap-ons"}]},
 {slug:"bdsm",kind:"product",name:"BDSM & Fetiche",short:"Kits e acessórios BDSM",line:"Somente produtos BDSM confirmados no catálogo do parceiro.",tone:"wine",coverIds:["44625061400"],filters:[{label:"Kits BDSM",type:"kits-bdsm"}]},
 {slug:"bem-estar",kind:"product",name:"Lubrificantes & Cuidados",short:"Lubrificantes, higiene e cosmética",line:"Lubrificantes, géis, limpeza e outros cuidados íntimos.",tone:"sage",coverIds:["34454438089","42283692111"],filters:[{label:"Lubrificantes",type:"lubrificantes"},{label:"Higiene íntima",type:"higiene"},{label:"Géis",type:"geis-estimulantes"},{label:"Cosmética",type:"cosmetica"},{label:"Bolas de Kegel",type:"kegel"},{label:"Desempenho",type:"desempenho"}]},
 {slug:"massagem",kind:"product",name:"Massagem Erótica",short:"Velas, óleos e kits de massagem",line:"Artigos de massagem com fragrância, óleos e kits específicos.",tone:"blue",coverIds:["41451884990","38688672239"],filters:[{label:"Velas de massagem",type:"velas"},{label:"Óleos",type:"oleos"},{label:"Kits",type:"kits-massagem"}]},
 {slug:"jogos-acessorios",kind:"product",name:"Kits & Acessórios",short:"Kits, bolsas e carregadores",line:"Kits eróticos, acessórios, bolsas e carregadores próprios.",tone:"stone",coverIds:["45803252805","40468132346"],filters:[{label:"Kits eróticos",type:"kits"},{label:"Bolsas de arrumação",type:"arrumacao"},{label:"Carregadores",type:"carregadores"},{label:"Livros",type:"livros"}]},
 {slug:"feromonas",kind:"product",name:"Perfumes & Feromonas",short:"Perfumes, incensos e fragrâncias",line:"Perfumes, incensos e fragrâncias da gama Diversual.",tone:"peach",coverIds:["40344902043","39294900359"],filters:[{label:"Perfumes",type:"perfumes"},{label:"Incensos",type:"incensos"},{label:"Aromas",type:"aromas"}]},
 {slug:"lingerie",kind:"product",name:"Lingerie Sexy",short:"Moda íntima e conjuntos",line:"Aparecerá na montra quando houver produtos autorizados desta categoria.",tone:"rose",coverIds:[],filters:[{label:"Lingerie",type:"lingerie"}]}
] as const;

export type Category=(typeof categories)[number];
export const categoryBySlug=(slug:string)=>categories.find(c=>c.slug===slug);
export const productCategories=categories.filter(c=>c.kind==="product");
export const audienceCategories=categories.filter(c=>c.kind==="audience");

export const subcategoryLabels:Record<string,string>={
"prostata":"Estimuladores da próstata","arneses":"Arneses","vibradores":"Vibradores",
"dildos":"Dildos","arrumacao":"Bolsas de arrumação","lubrificantes":"Lubrificantes",
"higiene":"Higiene íntima","aneis":"Anéis penianos","kegel":"Bolas de Kegel",
"vibradores-compactos":"Vibradores compactos","bolas-anais":"Bolas anais",
"ovos":"Ovos vibratórios","higiene-anal":"Higiene anal","plugs":"Plugs anais",
"geis-estimulantes":"Géis estimulantes","velas":"Velas de massagem",
"vibradores-casais":"Vibradores para casais","masturbadores":"Masturbadores",
"kits":"Kits eróticos","sugadores":"Sugadores","strap-ons":"Strap-ons",
"perfumes":"Perfumes","incensos":"Incensos","aromas":"Aromas","oleos":"Óleos de massagem",
"kits-massagem":"Kits de massagem","carregadores":"Carregadores","livros":"Livros",
"desempenho":"Produtos de desempenho","cosmetica":"Cosmética íntima","kits-bdsm":"Kits BDSM",
"kits-anal":"Kits anais","vibradores-anais":"Vibradores anais",
"estimulacao-oral":"Estimulação oral","rabbits":"Vibradores tipo coelhinho"
};

export const collections = [
  { name:"Estimuladores compactos", subtitle:"Formatos para uma descoberta tranquila", category:"estimuladores", categoryName:"Estimuladores", tone:"lilac", symbol:"ripple" },
  { name:"Massajadores pessoais", subtitle:"Conforto e diferentes intensidades", category:"para-ela", categoryName:"Para Ela", tone:"rose", symbol:"petal" },
  { name:"Seleção para casais", subtitle:"Explorar a dois, sem pressa", category:"para-casais", categoryName:"Para Casais", tone:"wine", symbol:"rings" },
  { name:"Lingerie delicada", subtitle:"Design, tecidos e elegância", category:"lingerie", categoryName:"Lingerie", tone:"peach", symbol:"fabric" },
  { name:"Lubrificantes", subtitle:"Como escolher a base indicada", category:"bem-estar", categoryName:"Bem-estar Íntimo", tone:"sage", symbol:"leaf" },
  { name:"Óleos de massagem", subtitle:"Texturas para relaxar", category:"massagem", categoryName:"Massagem", tone:"sand", symbol:"sun" },
  { name:"Acessórios para ele", subtitle:"Explora opções com conforto", category:"para-ele", categoryName:"Para Ele", tone:"stone", symbol:"wave" },
  { name:"Jogos a dois", subtitle:"Ideias para partilhar", category:"jogos-acessorios", categoryName:"Jogos & Acessórios", tone:"blue", symbol:"spark" },
  { name:"Kits para iniciantes", subtitle:"Começar por onde te sentires bem", category:"para-ela", categoryName:"Para Ela", tone:"rose", symbol:"petal" },
  { name:"Preservativos e proteção", subtitle:"Guia de tamanhos e materiais", category:"bem-estar", categoryName:"Bem-estar Íntimo", tone:"sage", symbol:"leaf" },
  { name:"Kits para oferecer", subtitle:"Pequenos gestos com intenção", category:"jogos-acessorios", categoryName:"Jogos & Acessórios", tone:"blue", symbol:"spark" },
  { name:"Bodys e robes", subtitle:"Uma seleção de diferentes estilos", category:"lingerie", categoryName:"Lingerie", tone:"peach", symbol:"fabric" },
] as const;

export const guides = [
  { slug: "primeira-compra", title: "A tua primeira escolha, sem complicações", read: "4 min", summary: "O que observar antes de escolher um produto: materiais, utilização e cuidados." },
  { slug: "materiais", title: "Materiais: o que deves saber", read: "5 min", summary: "Como distinguir materiais e onde encontrar informação útil nas fichas dos fornecedores." },
  { slug: "privacidade", title: "Compras discretas: como confirmar as condições", read: "3 min", summary: "O que verificar no site da loja parceira antes de finalizar a encomenda." },
] as const;
