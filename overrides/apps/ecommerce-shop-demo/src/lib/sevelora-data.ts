// Categorias e atalhos para os produtos reais dos fornecedores autorizados.
export const categories=[
{slug:"para-ela",name:"Para Ela",short:"Sugadores, vibradores e massajadores",line:"Brinquedos e artigos íntimos para ela.",tone:"rose",symbol:"petal",sub:["Sugadores","Vibradores","Massajadores"],filters:[{label:"Sugadores",query:"succionador"},{label:"Vibradores",query:"vibrador"},{label:"Massajadores",query:"masajeador"}]},
{slug:"para-ele",name:"Para Ele",short:"Masturbadores, próstata e anéis",line:"Descobre a seleção de produtos para ele.",tone:"stone",symbol:"wave",sub:["Masturbadores","Próstata","Anéis"],filters:[{label:"Masturbadores",query:"masturbador"},{label:"Próstata",query:"prostata"},{label:"Anéis",query:"anillo"}]},
{slug:"para-casais",name:"Para Casais",short:"Jogos e brinquedos a dois",line:"Novas descobertas para casais.",tone:"wine",symbol:"rings",sub:["Jogos","Kits","Controlo remoto"],filters:[{label:"Jogos",query:"juego"},{label:"Kits",query:"kit"},{label:"Controlo remoto",query:"control remoto"}]},
{slug:"estimuladores",name:"Vibradores & Dildos",short:"Vibradores, sugadores e dildos",line:"Encontra o tipo de estimulador que procuras.",tone:"lilac",symbol:"ripple",sub:["Vibradores","Sugadores","Dildos"],filters:[{label:"Vibradores",query:"vibrador"},{label:"Sugadores",query:"succionador"},{label:"Dildos",query:"dildo"}]},
{slug:"anal",name:"Prazer Anal",short:"Plugs, acessórios e higiene",line:"Artigos e acessórios para prazer anal.",tone:"sand",symbol:"sun",sub:["Plugs","Acessórios","Higiene"],filters:[{label:"Plugs",query:"plug"},{label:"Acessórios",query:"anal"},{label:"Higiene",query:"enema"}]},
{slug:"bdsm",name:"BDSM & Fetiche",short:"Bondage, acessórios e fetiche",line:"Explora a seleção BDSM e fetiche.",tone:"wine",symbol:"rings",sub:["Bondage","Algemas","Arneses"],filters:[{label:"Bondage",query:"bondage"},{label:"Algemas",query:"esposas"},{label:"Arneses",query:"arnes"}]},
{slug:"lingerie",name:"Lingerie Sexy",short:"Bodys, conjuntos e moda íntima",line:"Peças de lingerie para diferentes estilos.",tone:"peach",symbol:"fabric",sub:["Bodys","Conjuntos","Tangas"],filters:[{label:"Bodys",query:"body"},{label:"Conjuntos",query:"conjunto"},{label:"Tangas",query:"tanga"}]},
{slug:"bem-estar",name:"Lubrificantes & Cuidados",short:"Lubrificantes, higiene e proteção",line:"Cuidados e bem-estar íntimo.",tone:"sage",symbol:"leaf",sub:["Lubrificantes","Higiene","Preservativos"],filters:[{label:"Lubrificantes",query:"lubricante"},{label:"Higiene",query:"limpiador"},{label:"Preservativos",query:"preservativo"}]},
{slug:"massagem",name:"Massagem Erótica",short:"Óleos, velas e massajadores",line:"Massagem e relaxamento íntimo.",tone:"blue",symbol:"spark",sub:["Óleos","Massajadores","Velas"],filters:[{label:"Óleos",query:"aceite"},{label:"Massajadores",query:"masajeador"},{label:"Velas",query:"vela"}]},
{slug:"jogos-acessorios",name:"Jogos & Acessórios",short:"Jogos, kits e acessórios",line:"Jogos e acessórios para descobrir.",tone:"stone",symbol:"wave",sub:["Jogos","Acessórios","Kits"],filters:[{label:"Jogos",query:"juego"},{label:"Acessórios",query:"accesorio"},{label:"Kits",query:"kit"}]}
] as const;

export type Category = (typeof categories)[number];
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

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
