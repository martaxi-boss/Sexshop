// Sevelora: taxonomia editorial de DEMONSTRACAO. Nao inclui ofertas comerciais.
// Os produtos e precos reais so entram com consentimento de parceiros Awin.
export const categories = [
  { slug: "para-ela", name: "Para Ela", short: "Explora ao teu ritmo", line: "Escolhas delicadas para diferentes momentos.", tone: "rose", symbol: "petal", sub: ["Estimuladores externos", "Massajadores pessoais", "Kits para iniciantes", "Cuidados íntimos"] },
  { slug: "para-ele", name: "Para Ele", short: "Descobre novas sensações", line: "Conforto, descoberta e bem-estar.", tone: "stone", symbol: "wave", sub: ["Massajadores", "Estimuladores", "Acessórios", "Cuidados íntimos"] },
  { slug: "para-casais", name: "Para Casais", short: "Momentos a dois", line: "Descobertas para partilhar com tranquilidade.", tone: "wine", symbol: "rings", sub: ["Kits para casais", "Jogos a dois", "Óleos de massagem", "Acessórios"] },
  { slug: "estimuladores", name: "Estimuladores", short: "Escolhe o formato ideal", line: "Diferentes formatos, materiais e funcionalidades.", tone: "lilac", symbol: "ripple", sub: ["Compactos", "Com vibração", "Recarregáveis", "Para iniciantes"] },
  { slug: "lingerie", name: "Lingerie", short: "Estilo e confiança", line: "Peças para te sentires bem contigo.", tone: "peach", symbol: "fabric", sub: ["Conjuntos", "Bodys", "Robes", "Acessórios de moda"] },
  { slug: "bem-estar", name: "Bem-estar Íntimo", short: "Cuidado que faz sentido", line: "Produtos para conforto, higiene e prevenção.", tone: "sage", symbol: "leaf", sub: ["Lubrificantes", "Preservativos", "Higiene íntima", "Cuidados corporais"] },
  { slug: "massagem", name: "Massagem & Relaxamento", short: "Rituais só teus", line: "Bem-estar e momentos sem pressa.", tone: "sand", symbol: "sun", sub: ["Óleos de massagem", "Velas de massagem", "Aromas", "Relaxamento"] },
  { slug: "jogos-acessorios", name: "Jogos & Acessórios", short: "Um toque de descoberta", line: "Ideias para surpreender e explorar.", tone: "blue", symbol: "spark", sub: ["Jogos para casais", "Kits e ofertas", "Acessórios", "Armazenamento"] },
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
