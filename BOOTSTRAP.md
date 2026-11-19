# BOOTSTRAP — SEVELORA SEX SHOP
18/11/2026 — Contrato de implementação e aceite. Este documento é a fonte de verdade para design e arquitetura.

## Pedido do proprietário
Construir uma SEX SHOP portuguesa para adultos +18, com apresentação comercial forte como a Cupido Shop (https://www.cupidosshop.com/pt/) e navegação/categorias profundas como a Afrodisia (https://www.afrodisia.pt/), sem copiar a identidade, as imagens nem os textos dessas lojas. Reutilizar o repositório MIT DemoShop Nuvi (https://github.com/sajanv88/nextjs-ecommerce-shop-demo) somente como base técnica. Não transformar a Sevelora numa montra abstrata ou genérica de wellness.

## UI vinculativa
- Primeira dobra: SEX SHOP inequívoco, produtos reais quando disponíveis e acesso claro a catálogo/categorias.
- Navegação apenas por categorias de produto efetivas: Vibradores/Dildos, Prazer Anal, Masturbadores, Anéis, Brinquedos a Dois, BDSM, Cuidados, Massagem, Kits/Acessórios e Perfumes. Lingerie só quando existirem produtos; pesquisa e filtros sempre funcionais.
- Identidade Sevelora própria com vinho escuro, rosa forte e contrastes de leitura. Fotografia dos produtos apenas de feeds autorizados. Mobile antes de tudo.
- Awin: venda e pagamento no parceiro; sem carrinho local, sem preços EUR inventados, sem falsas promessas de stock, descontos, entrega, avaliação ou portes.
- A marca e o domínio comercial definitivo ainda carecem de verificação.

## Engenharia e higiene
- Repositório existente martaxi-boss/Sexshop; trabalhar na branch integration/sevelora-nuvi-v1 e PR já abertas. Não criar branch extra para cada alteração.
- Fonte de verdade do site: overrides/apps/ecommerce-shop-demo/src. apps/ecommerce-shop-demo/src é espelho gerado pelo scripts/assemble-nuvi.sh. Atualizar ambos no mesmo commit ou através do assembler, nunca só um.
- Preservar o fornecedor Diversual aprovado, os links Awin, as credenciais privadas e os dados sincronizados. Não publicar segredos no GitHub.
- VPS limitada a /srv/projects/Sexshop. Reutilizar Node privado e workflow de deploy existente. Proibido tocar nos outros projetos, serviços ou instalações globais.
- Antes de qualquer limpeza: inventário read-only; preservar current, release anterior/rollback e dados; nunca apagar indiscriminadamente branches, releases ou logs.
- Deploy via GitHub Actions existente, commit SHA fixo, testado e com rollback. Manter noindex na fase de staging.

## Critérios de aceitação
- Build Next.js e testes catalog-test + smoke PASS.
- Navegação de categorias, pesquisa, filtros, links Awin, ficha de produto, rotas e 404 testados.
- Screenshots 390px e 1366px, sem overflow, revistas visualmente antes de afirmar que o design cumpre a encomenda.
- Verificar site ativo, SHA implantado e isolamento de Low Cost Europa.
- Não confundir sucesso técnico com aprovação visual/comercial. Declarar pendências de forma objetiva.

## Contrato de idioma e categorias — 19/11/2026
- Tudo o que aparece na montra, catálogo, fichas e menus deve estar em português de Portugal, salvo nomes comerciais próprios.
- Traduções e categorias identificadas por aw_product_id em scripts/diversual-ptpt-*.mjs; não inferir palavras-chave no texto promocional ou misturar lubrificantes com vibradores.
- O feed oficial não distingue categorias de produtos (151 entradas com categoria genérica); manter curadoria individual e subcategorias exatas.
- Ocultar categorias sem produtos no menu e embalagens de expedição sem valor comercial para o cliente final.
- Novos IDs exigem revisão editorial. Atualizações do feed não devem regressar ao espanhol, nem destruir dados e releases anteriores.
- Não acrescentar uma nova branch nem instalar serviços ou modelos de tradução na VPS.

## Correção de categorias e fotografias — 19/11/2026, segunda ronda
- Cada produto tem UM tipo e UMA categoria principal. scripts/diversual-ptpt.mjs determina a categoria por tipo e a sincronização grava products[].categories com exatamente um elemento.
- O fornecedor ainda pode fornecer metadata técnica audiences, mas não surgem na interface nem na navegação; só mostramos categorias reais de artigos.
- Vibradores & Dildos, Prazer Anal, Masturbadores, Anéis Penianos, Brinquedos a Dois, BDSM, Lubrificantes & Cuidados, Massagem, Kits & Acessórios, Perfumes & Feromonas são famílias exclusivas. Lingerie só aparece quando tiver catálogo aprovado.
- As fotografias de categorias vêm de produtos expressamente associados a cada família (coverIds em sevelora-data.ts), com object-fit: contain, sem recortar, distorcer ou tapar com degradês.
- Nenhuma alteração pode criar duplicação nos totais das famílias, trocar a imagem de um tipo por outro, ou transformar as seleções por público em categorias de produto.
- Garantir pt-PT, preços EUR verificados, links Awin, mobile e rollback da VPS intactos.

## Ordem do proprietário — remover módulo por destinatário (19/11/2026)
- Remover integralmente a secção «Explora à tua maneira» e todas as opções «Para Ela», «Para Ele» e «Para Casais» da página inicial, cabeçalhos, menu móvel, catálogo, fichas e rodapé.
- As rotas antigas `/categoria/para-ela`, `/categoria/para-ele` e `/categoria/para-casais` devem devolver 404 e não ser sugeridas no site.
- Manter apenas as 10 famílias de artigos, respeitando uma categoria por produto; não apagar o catálogo aprovado, preços EUR ou links Awin.
- Alinhar as categorias em 5 colunas no desktop (duas linhas iguais) e 2 colunas no telemóvel; em tablets, centrar a última categoria quando necessário. Fotografias inteiras e sem cortes.
- Atualizar a fonte em overrides e o espelho de apps no mesmo commit. Publicar pelo workflow atual, com rollback preservado.

## Remoção estritamente delimitada pela imagem do proprietário — 19/11/2026
- Remover da página inicial exclusivamente o conteúdo do quadrado assinalado com X: legendas +18/compra no parceiro logo abaixo dos botões, montra de dois produtos «Na nossa montra / Diversual», e faixa numerada 01/02/03.
- Conservar título e botões do hero, categorias, produtos em destaque noutro módulo, guias, navegação, textos e cores existentes. O pedido «o resto fica tudo» não autoriza uma mudança global de paleta.
- Colapsar o espaço vazio do hero e manter a ligação ao #categorias. Não remover produtos do catálogo nem links de afiliado.

## Rebrand visual bordô escuro — 19/11/2026 (pedido do proprietário)
- Cor-base do fundo em todo o site: #280a1c (bordô vinho escuro), com painéis em #40152d/#41162e e variações da mesma família. Proibido regressar a grandes secções brancas e a botões com fundo branco.
- Texto principal marfim-rosado #fff0f6, secundário #e6c0d1, destaques #ff99c5. Botões e chamadas de atenção em rosa-claro #ffd0e3 com texto escuro #391024; hover #f4a6c8.
- Fotografia original de produto: área interna branca neutra para não destacar retângulos brancos da imagem do fornecedor, SEM tornar brancos os fundos das secções/catálogo/cartões.
- Cabeçalho, barra de categorias, página inicial, catálogo, filtros, páginas de categoria/produto, guias, afiliação e rodapé partilham a identidade vinho escuro; preservar preços, rotas, artigos, noindex e links Awin.
- Verificar visualmente 390px e 1366px; legibilidade, contraste e ausência de scroll horizontal; não chamar aprovação estética ao PASS de código.

## Limpeza visual e hierarquia — 19/11/2026
- O proprietário aprovou a paleta bordô e os botões rosa, mas considerou a interface demasiado confusa. Não alterar as cores principais.
- Um único menu desktop com quatro famílias principais e acesso ao catálogo; menu móvel inclui todas as categorias. Retirar a segunda barra redundante de categorias, preservando os links no catálogo e a navegação móvel.
- Na home, cartões de categorias sem etiquetas numeradas nem descrições longas: imagem oficial, nome e número de artigos. Duas filas de cinco no desktop, duas colunas no mobile.
- Reduzir destaques iniciais de oito para quatro produtos; nos cartões de produto retirar avisos "Diversual/Afiliado", marca e indicação repetitiva de stock, mantendo fotografia, nome, preço e UM botão para a loja parceira. Fotografia e nome conduzem à ficha interna.
- Guia de compra na home como uma faixa discreta com um único acesso. Evitar rodapé promocional extra/repetições de CTAs. As páginas de guias, catálogo e afiliação continuam acessíveis.
- Simplificar rótulos duplicados dos filtros e hierarquia tipográfica; não alterar dados, preços, catálogo, contratos Awin, serviços, SEO staging ou projeto alheio. Validar desktop, Android/mobile, contraste e barras de deslocamento.
