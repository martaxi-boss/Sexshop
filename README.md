# Sevelora — sex shop de afiliação para Portugal

**Domínio comercial canónico:** https://sevelora.eu (HTTPS, sem `www`). A versão `www` redireciona por 301 para a versão canónica. O antigo domínio de testes foi retirado e não faz parte da publicação.

**Modelo:** montra editorial de produtos para adultos (+18), com compra, pagamento, transporte e devoluções no fornecedor parceiro; não há carrinho, checkout ou pagamentos próprios.

## Fonte de verdade e operação

- Repositório do site: `martaxi-boss/Sexshop`, branch principal `main`. Não desenvolver nem publicar a partir de branches antigas.
- Base técnica: [DemoShop Nuvi](https://github.com/sajanv88/nextjs-ecommerce-shop-demo) sob licença MIT, preservada em `LICENSE.upstream`. Não reutilizar fotografias ou textos de demonstração sem autorização.
- Fonte de interface: `overrides/apps/ecommerce-shop-demo/src`. Espelho para build: `apps/ecommerce-shop-demo/src`. O assembler `scripts/assemble-nuvi.sh` mantém ambos equivalentes.
- Deploy isolado na VPS: `/srv/projects/Sexshop`; serviço `sexshop.service`; proxy Nginx; Node privado do projeto. Não tocar nos outros projetos.
- Orquestração de publicação: [workflow da VPS](https://github.com/martaxi-boss/VPS/blob/main/.github/workflows/sexshop-catalog-deploy-20261118.yml), que usa **SHA fixo do código aprovado**. Atualizar esse SHA quando se quiser publicar um novo commit de `main`; nunca confiar no mero nome da branch.
- A ativação utiliza `releases/<SHA>`, symlink `current` e referência à release anterior para rollback. Preservar sempre a release ativa, uma release de recuperação, dados sincronizados, configuração e credenciais privadas.

## Catálogo e Awin

- Fornecedor autorizado: Diversual ES, programa Awin 37722; feed selecionado 78949. Links de afiliação identificados como patrocinados, com preços EUR individuais validados e informação em português de Portugal.
- Catálogo dinâmico privado: `/srv/projects/Sexshop/data/catalog.json`; atualização agendada por `sexshop-catalog-sync.timer`.
- Credencial do feed: `/srv/projects/Sexshop/.private/diversual-feed-url` com permissões restritas. Nunca a expor em commits, logs, HTML ou outputs públicos.
- A quantidade de produtos e a disponibilidade variam com o feed. Referência do deploy de 19/11/2026: 147 artigos aprovados para a montra.
- A descrição comercial não substitui a informação de preço final, portes, stock e condições no checkout do parceiro.

## SEO e indexação

- Origem canónica: `https://sevelora.eu`; páginas e links internos em pt-PT.
- Publicação oficial com `NEXT_PUBLIC_SITE_URL=https://sevelora.eu` e `NEXT_PUBLIC_LAUNCH=true`, com `index, follow`, `robots.txt` e `sitemap.xml`.
- O deploy de 19/11/2026 validou externamente **162 URLs no sitemap**, incluindo produtos, categorias com artigos e páginas institucionais. A inexistência de `noindex` foi validada em QA mobile/desktop.
- **A indexação efetiva e o estado de submissão do sitemap só podem ser confirmados na propriedade `sevelora.eu` do Google Search Console.** Um sitemap válido não garante indexação nem ranking.
- Estado confirmado em 21/11/2026: página inicial indexada; submissão oficial no Search Console consolidada em `sitemap.txt`, com Sucesso e 162 URLs descobertos (147 produtos). A submissão XML redundante com erro foi retirada do painel; o XML público mantém-se disponível. Produto de amostra aprovado no teste Google em direto, ainda sem confirmação de indexação; pedido individual devolveu erro do Search Console. [Relatório e provas](docs/SEO_GOOGLE_20261121.md).
- `/sitemap.txt` oferece as mesmas URLs do XML, uma por linha em UTF-8, a partir do mesmo catálogo e política de lançamento. Os dois formatos são anunciados em `robots.txt`; o TXT é uma alternativa de entrega suportada pelo Google, sem garantir processamento ou indexação.
- O domínio de teste foi descontinuado; não o restaurar nem inserir como canonical, sitemap ou redirect.

## Testes e qualidade

- Verificação de catálogo: `node scripts/catalog-test.mjs`.
- Build: `pnpm install --frozen-lockfile` e `pnpm --dir apps/ecommerce-shop-demo build`.
- Smoke HTTP: `node scripts/smoke.mjs`; QA publicada em 390px e 1366px, pesquisa, filtros, categorias, produtos, 404, links Awin, favicon e design bordô.
- [CI do projeto](https://github.com/martaxi-boss/Sexshop/actions) · [deploy de domínio e sitemap](https://github.com/martaxi-boss/VPS/actions/runs/44554020362).

## Limites de higiene

Este repositório é público: apenas código, documentação, material licenciado e envelope de feed cifrado podem ser versionados. Não apagar catálogos privados, segredos, logs necessários a diagnóstico ou a release anterior para «limpar» o projeto. Não reescrever o histórico remoto sem uma necessidade concreta de segurança.
