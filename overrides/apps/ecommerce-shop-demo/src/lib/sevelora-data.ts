// Montra Sevelora: apenas categorias reais de produtos, uma categoria por artigo.
// Fotografias das categorias: IDs concretos da família, nunca o primeiro produto aleatório.
export const categories=[
 {slug:"estimuladores",kind:"product",name:"Vibradores & Dildos",short:"Vibradores, sugadores e estimuladores íntimos",line:"Vibradores, dildos, exercitadores pélvicos e estimuladores íntimos por tipo.",tone:"lilac",coverIds:["34454438101","39096594352"],filters:[{label:"Coelhinhos",type:"rabbits"},{label:"Vibradores",type:"vibradores"},{label:"Vibradores compactos",type:"vibradores-compactos"},{label:"Sugadores",type:"sugadores"},{label:"Dildos",type:"dildos"},{label:"Ovos",type:"ovos"},{label:"Estimulação oral",type:"estimulacao-oral"},{label:"Exercitadores pélvicos",type:"kegel"}]},
 {slug:"anal",kind:"product",name:"Prazer Anal",short:"Plugs, bolas, próstata e higiene anal",line:"Apenas produtos específicos para prazer e higiene anal.",tone:"sand",coverIds:["43582237884","45279704377"],filters:[{label:"Plugs anais",type:"plugs"},{label:"Bolas anais",type:"bolas-anais"},{label:"Próstata",type:"prostata"},{label:"Higiene anal",type:"higiene-anal"},{label:"Kits anais",type:"kits-anal"},{label:"Vibradores anais",type:"vibradores-anais"}]},
 {slug:"masturbadores",kind:"product",name:"Masturbadores",short:"Modelos manuais e automáticos",line:"Masturbadores masculinos manuais e automáticos, sem produtos de outras famílias.",tone:"stone",coverIds:["43582237885","40148294052"],filters:[{label:"Masturbadores masculinos",type:"masturbadores"}]},
 {slug:"aneis",kind:"product",name:"Anéis Penianos",short:"Anéis vibratórios e ajustáveis",line:"Anéis penianos e anéis de estimulação a dois.",tone:"peach",coverIds:["45520166949","42519444179"],filters:[{label:"Anéis penianos",type:"aneis"}]},
 {slug:"casais",kind:"product",name:"Brinquedos a Dois",short:"Vibradores para casais e strap-ons",line:"Brinquedos especificamente concebidos para utilização a dois, incluindo arneses e strap-ons.",tone:"wine",coverIds:["43396308152","37160044645"],filters:[{label:"Vibradores para casais",type:"vibradores-casais"},{label:"Arneses",type:"arneses"},{label:"Strap-ons",type:"strap-ons"}]},
 {slug:"bem-estar",kind:"product",name:"Lubrificantes & Cuidados",short:"Lubrificantes, higiene e cosmética",line:"Lubrificantes, géis, limpeza e cuidados íntimos.",tone:"sage",coverIds:["34454438089","42283692111"],filters:[{label:"Lubrificantes",type:"lubrificantes"},{label:"Higiene íntima",type:"higiene"},{label:"Géis",type:"geis-estimulantes"},{label:"Cosmética",type:"cosmetica"},{label:"Desempenho",type:"desempenho"}]},
 {slug:"massagem",kind:"product",name:"Massagem Erótica",short:"Velas e óleos de massagem",line:"Velas e óleos perfumados para momentos de massagem.",tone:"blue",coverIds:["41451884990","38688672239"],filters:[{label:"Velas de massagem",type:"velas"},{label:"Óleos",type:"oleos"}]},
 {slug:"jogos-acessorios",kind:"product",name:"Kits & Acessórios",short:"Kits, bolsas e acessórios",line:"Kits eróticos, bolsas e outros acessórios selecionados.",tone:"stone",coverIds:["45803252805","40468132346"],filters:[{label:"Kits eróticos",type:"kits"},{label:"Bolsas de arrumação",type:"arrumacao"},{label:"Livros",type:"livros"}]},
 {slug:"feromonas",kind:"product",name:"Perfumes & Feromonas",short:"Perfumes, incensos e fragrâncias",line:"Perfumes, incensos e fragrâncias da gama Diversual.",tone:"peach",coverIds:["40344902043","39294900359"],filters:[{label:"Perfumes",type:"perfumes"},{label:"Incensos",type:"incensos"},{label:"Aromas",type:"aromas"}]},
 {slug:"lingerie",kind:"product",name:"Lingerie Sexy",short:"Moda íntima e conjuntos",line:"Aparecerá na montra quando houver produtos autorizados desta categoria.",tone:"rose",coverIds:[],filters:[{label:"Lingerie",type:"lingerie"}]}
] as const;

export type Category=(typeof categories)[number];
export const categoryBySlug=(slug:string)=>categories.find(c=>c.slug===slug);
export const productCategories=categories.filter(c=>c.kind==="product");

export const subcategoryLabels:Record<string,string>={
"prostata":"Estimuladores da próstata","arneses":"Arneses","vibradores":"Vibradores",
"dildos":"Dildos","arrumacao":"Bolsas de arrumação","lubrificantes":"Lubrificantes",
"higiene":"Higiene íntima","aneis":"Anéis penianos","kegel":"Exercitadores pélvicos",
"vibradores-compactos":"Vibradores compactos","bolas-anais":"Bolas anais",
"ovos":"Ovos vibratórios","higiene-anal":"Higiene anal","plugs":"Plugs anais",
"geis-estimulantes":"Géis estimulantes","velas":"Velas de massagem",
"vibradores-casais":"Vibradores para casais","masturbadores":"Masturbadores",
"kits":"Kits eróticos","sugadores":"Sugadores","strap-ons":"Strap-ons",
"perfumes":"Perfumes","incensos":"Incensos","aromas":"Aromas","oleos":"Óleos de massagem",
"kits-massagem":"Kits de massagem","livros":"Livros",
"desempenho":"Produtos de desempenho","cosmetica":"Cosmética íntima",
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
