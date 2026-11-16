# Referencias para o design Sevelora (16-11-2026)

## Estado e alcance

Analise de conteudo das paginas publicas abaixo (consultadas atraves de resultados web em 16-11-2026).
Nao e auditoria de performance, acessibilidade, experiencia visual por screenshot ou testes completos em browser.
Estes sites sao **referencias de UX/estrutura**, nao fornecedores confirmados da Awin.

- [Cupido Shop Portugal](https://www.cupidosshop.com/pt/)
- [Cupido — pagina editorial sobre sex shop](https://www.cupidosshop.com/pt/content/Sex-Shop-Online/)
- [Afrodisia](https://www.afrodisia.pt/)
- [Afrodisia — entrega imediata](https://www.afrodisia.pt/categoria-produto/artigos-p-entrega-imediata/)

## O que aproveitar (sem copiar conteudos ou identidade)

| Referencia | Observacao sustentada pelo site | Adaptacao original Sevelora |
| --- | --- | --- |
| Cupido | Home organizada por destaques, "para ela", "para ele", casais, novidades, lingerie e promocoes | Home editorial premium com secao de categorias e produtos autorizados |
| Cupido | Guias de compra, FAQ e sinais de confianca; algumas imagens sensiveis exigem revelacao 18+ | Artigos originais, FAQ e ocultacao opcional de imagens explicitas |
| Cupido | Menus com muitas subcategorias | Navegacao compacta no mobile; categorias profundas na pagina de catalogo |
| Afrodisia | Catalogo com pesquisa, categorias, subcategorias e precos | Catalogo curado com filtros por tipo, marca e preco quando houver feed |
| Afrodisia | Categoria distinta de artigos com entrega imediata | Prazo/stock somente por fornecedor e so se os dados forem fiaveis |
| Afrodisia | Enfatiza expedicao discreta/cacifos e distingue artigos em stock | Declarar vantagens apenas dos parceiros efetivamente verificados |

## Arquitetura proposta da loja

Base tecnica: [DemoShop Nuvi](https://github.com/sajanv88/nextjs-ecommerce-shop-demo) (codigo MIT, licencas de media e marcas a respeitar).

**Menu superior:** Inicio | Para Ela | Para Ele | Para Casais | Bem-estar Intimo | Lingerie | Acessorios | Guias.

**Pagina inicial**
1. Hero discreto com identidade Sevelora, sem fotografia explicita, com entrada para catalogo.
2. Cartoes das principais categorias.
3. Novidades de parceiros aprovados.
4. Selecao editorial por perfis (Ela, Ele, Casais).
5. Conteudo educativo: como escolher, materiais, higiene e cuidados.
6. Transparencia: "Loja de afiliacao. A compra e finalizada no parceiro.".
7. Footer com aviso 18+, privacidade, cookies se aplicavel, divulgacao de afiliacao e contactos reais.

**Listagem/catalogo**
- Pesquisa e filtros relevantes, ordenacao, categorias e estado fiavel do produto.
- Imagens autorizadas pelo fornecedor; ocultacao opt-in de media explicita quando apropriado.
- Preco EUR apenas se atualizado e permitido; caso contrario "Ver preco no parceiro".
- Sem avaliacoes inventadas, urgencia falsa, contadores falsos ou sinais de stock inexistente.

**Ficha de produto**
- Nome, marca, imagens autorizadas, caracteristicas, materiais, cuidados, variantes.
- CTA unico "Ver na loja parceira" apontando ao link Awin aprovado, com aviso de afiliacao.
- Explicar que preco, pagamento, prazos, envio e devolucoes sao os indicados pelo vendedor.
- Contagem de cliques sem recolher dados pessoais desnecessarios.

**Modelo de negocios**
- Catalogo com 2-3 parceiros, conforme admissao e autorizacao de feeds na Awin.
- Sem carrinho nem checkout, sem registo de cliente e sem pagamentos no website.
- Sem importar fotos ou descricoes da Cupido/Afrodisia sem licenca.
- Nao prometer envio em 24h, portes gratuitos ou embalagens discretas de forma geral.
- Publico adulto; regras de conteudo, SEO, anuncios e RGPD devem ser verificadas.
- Portugues PT primeiro, Espanhol ES depois.

## Identidade

**Sevelora** foi aceite pelo titular como nome de trabalho em 16-11-2026.
Visual recomendado: boutique de bem-estar intimo, creme + vinho + dourado discreto, tipografia legivel, foco mobile.
**Alerta de marca:** existe [SELEVORA](https://selevora.com/) no setor beleza/cosmetica, nome
visualmente e foneticamente proximo. Nao assumir disponibilidade comercial de "Sevelora";
antes de dominio definitivo, pesquisar [TMview/EUIPO](https://www.euipo.europa.eu/pt/trade-marks/before-applying/availability),
INPI e dominios; pedir avaliacao especializada se necessario.

## Validacao pendente

- [ ] Comparar screenshots desktop/mobile reais e testar navegacao.
- [ ] Confirmar compatibilidade de dependencias, licencas do tema e imagens.
- [ ] Importar DemoShop Nuvi de forma auditada, respeitando a licenca MIT.
- [ ] Adaptar codigo e construir site de afiliacao sem checkout.
- [ ] Obter autorizacoes Awin e feed de produtos, rever termos de uso.
- [ ] Rever marca "Sevelora" antes de encomendar dominio, registar ou promover.
- [ ] Compilar, testar e publicar no DuckDNS com HTTPS e smoke test browser real.
- [ ] Sem mexer no Low Cost Europa; executaveis e dependencias na pasta Sexshop.

**Este documento e planeamento baseado nas paginas analisadas; nao representa implementacao nem deployment.**
