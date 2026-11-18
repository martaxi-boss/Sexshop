# BOOTSTRAP — SEVELORA SEX SHOP
18/11/2026 — Contrato de implementação e aceite. Este documento é a fonte de verdade para design e arquitetura.

## Pedido do proprietário
Construir uma SEX SHOP portuguesa para adultos +18, com apresentação comercial forte como a Cupido Shop (https://www.cupidosshop.com/pt/) e navegação/categorias profundas como a Afrodisia (https://www.afrodisia.pt/), sem copiar a identidade, as imagens nem os textos dessas lojas. Reutilizar o repositório MIT DemoShop Nuvi (https://github.com/sajanv88/nextjs-ecommerce-shop-demo) somente como base técnica. Não transformar a Sevelora numa montra abstrata ou genérica de wellness.

## UI vinculativa
- Primeira dobra: SEX SHOP inequívoco, produtos reais quando disponíveis e acesso claro a catálogo/categorias.
- Navegação por Para Ela, Para Ele, Para Casais, Vibradores/Dildos, Anal, BDSM, Lingerie, Cuidados, Massagem, Jogos. Pesquisa e filtros funcionais, subcategorias com resultados reais ou omitidas.
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
