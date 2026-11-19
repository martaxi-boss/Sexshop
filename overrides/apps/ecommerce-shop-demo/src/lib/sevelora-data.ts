// Categorias visuais; a distribuição de cada produto é curada por ID em scripts/diversual-ptpt-*.
// Nunca gerar categorias por palavras dispersas em descrições promocionais.
export const categories=[
{slug:"para-ela",name:"Para Ela",short:"Vibradores, coelhinhos e acessórios íntimos",line:"Estimuladores, bolas de Kegel e brinquedos pensados para ela.",tone:"rose",symbol:"petal",filters:[{label:"Vibradores tipo coelhinho",type:"rabbits"},{label:"Vibradores compactos",type:"vibradores-compactos"},{label:"Sugadores",type:"sugadores"},{label:"Ovos com comando",type:"ovos"},{label:"Bolas de Kegel",type:"kegel"},{label:"Estimulação oral",type:"estimulacao-oral"}]},
{slug:"para-ele",name:"Para Ele",short:"Masturbadores, próstata e anéis penianos",line:"Masturbadores manuais e automáticos, anéis e estimuladores prostáticos.",tone:"stone",symbol:"wave",filters:[{label:"Masturbadores",type:"masturbadores"},{label:"Estimuladores da próstata",type:"prostata"},{label:"Anéis penianos",type:"aneis"},{label:"Produtos de desempenho",type:"desempenho"}]},
{slug:"para-casais",name:"Para Casais",short:"Vibradores a dois, kits e strap-ons",line:"Brinquedos para casais, jogos íntimos e acessórios para utilizar a dois.",tone:"wine",symbol:"rings",filters:[{label:"Vibradores para casais",type:"vibradores-casais"},{label:"Arnês e strap-ons",type:"arneses"},{label:"Strap-ons",type:"strap-ons"},{label:"Anéis",type:"aneis"},{label:"Kits eróticos",type:"kits"},{label:"Ovos com comando",type:"ovos"}]},
{slug:"estimuladores",name:"Vibradores & Dildos",short:"Coelhinhos, balas, sugadores e dildos",line:"Escolhe o formato e o tipo de estimulação que procuras.",tone:"lilac",symbol:"ripple",filters:[{label:"Coelhinhos e dupla estimulação",type:"rabbits"},{label:"Balas e vibradores compactos",type:"vibradores-compactos"},{label:"Vibradores",type:"vibradores"},{label:"Sugadores",type:"sugadores"},{label:"Dildos",type:"dildos"},{label:"Ovos vibratórios",type:"ovos"},{label:"Estimulação oral",type:"estimulacao-oral"},{label:"Strap-ons",type:"strap-ons"}]},
{slug:"anal",name:"Prazer Anal",short:"Plugs, bolas anais e higiene",line:"Plugs, estimuladores, lubrificantes e acessórios específicos para estimulação anal.",tone:"sand",symbol:"sun",filters:[{label:"Plugs anais",type:"plugs"},{label:"Estimuladores da próstata",type:"prostata"},{label:"Bolas anais",type:"bolas-anais"},{label:"Higiene anal",type:"higiene-anal"},{label:"Lubrificantes anais",type:"lubrificantes"},{label:"Kits anais",type:"kits-anal"},{label:"Vibradores anais",type:"vibradores-anais"}]},
{slug:"bdsm",name:"BDSM & Fetiche",short:"Kits de acessórios BDSM",line:"Artigos de BDSM efetivamente disponíveis no catálogo do parceiro.",tone:"wine",symbol:"rings",filters:[{label:"Kits BDSM",type:"kits-bdsm"}]},
{slug:"lingerie",name:"Lingerie Sexy",short:"Conjuntos e moda íntima",line:"Esta categoria aparece quando existirem produtos autorizados de lingerie.",tone:"peach",symbol:"fabric",filters:[{label:"Lingerie",type:"lingerie"}]},
{slug:"bem-estar",name:"Lubrificantes & Cuidados",short:"Lubrificantes, géis e higiene íntima",line:"Produtos de higiene, lubrificação e cosmética íntima.",tone:"sage",symbol:"leaf",filters:[{label:"Lubrificantes",type:"lubrificantes"},{label:"Géis estimulantes",type:"geis-estimulantes"},{label:"Higiene",type:"higiene"},{label:"Bolas de Kegel",type:"kegel"},{label:"Cosmética",type:"cosmetica"},{label:"Produtos de desempenho",type:"desempenho"},{label:"Higiene anal",type:"higiene-anal"}]},
{slug:"massagem",name:"Massagem Erótica",short:"Velas, óleos e kits de massagem",line:"Velas e óleos aromáticos para sessões de massagem íntima.",tone:"blue",symbol:"spark",filters:[{label:"Velas de massagem",type:"velas"},{label:"Óleos de massagem",type:"oleos"},{label:"Kits de massagem",type:"kits-massagem"}]},
{slug:"jogos-acessorios",name:"Kits & Acessórios",short:"Kits, bolsas e carregadores",line:"Conjuntos eróticos e acessórios úteis para os teus brinquedos.",tone:"stone",symbol:"wave",filters:[{label:"Kits eróticos",type:"kits"},{label:"Kits anais",type:"kits-anal"},{label:"Kits BDSM",type:"kits-bdsm"},{label:"Bolsas de arrumação",type:"arrumacao"},{label:"Carregadores",type:"carregadores"},{label:"Livros",type:"livros"}]},
{slug:"feromonas",name:"Perfumes & Feromonas",short:"Perfumes, óleos e incensos",line:"Perfumes, incensos e fragrâncias íntimas da linha Diversual.",tone:"peach",symbol:"fabric",filters:[{label:"Perfumes",type:"perfumes"},{label:"Incensos",type:"incensos"},{label:"Aromas para tecidos",type:"aromas"},{label:"Óleos com fragrância",type:"oleos"}]}
] as const;

export const categoryBySlug=(slug:string)=>categories.find(c=>c.slug===slug);
export type Category=(typeof categories)[number];

export const subcategoryLabels:Record<string,string>={
 "prostata":"Estimuladores da próstata","arneses":"Arneses","vibradores":"Vibradores","dildos":"Dildos",
 "arrumacao":"Bolsas de arrumação","lubrificantes":"Lubrificantes","higiene":"Higiene íntima",
 "aneis":"Anéis penianos","kegel":"Bolas de Kegel e pavimento pélvico","vibradores-compactos":"Vibradores compactos",
 "bolas-anais":"Bolas anais","ovos":"Ovos vibratórios","higiene-anal":"Higiene anal","plugs":"Plugs anais",
 "geis-estimulantes":"Géis estimulantes","velas":"Velas de massagem","vibradores-casais":"Vibradores para casais",
 "masturbadores":"Masturbadores","kits":"Kits eróticos","sugadores":"Sugadores","strap-ons":"Strap-ons",
 "perfumes":"Perfumes","incensos":"Incensos","aromas":"Aromas","oleos":"Óleos de massagem",
 "kits-massagem":"Kits de massagem","carregadores":"Carregadores","livros":"Livros",
 "desempenho":"Produtos de desempenho","cosmetica":"Cosmética íntima","kits-bdsm":"Kits BDSM",
 "kits-anal":"Kits anais","vibradores-anais":"Vibradores anais","estimulacao-oral":"Estimuladores orais",
 "rabbits":"Vibradores tipo coelhinho"
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
