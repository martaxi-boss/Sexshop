# Sexshop — projeto de loja de afiliados

> Estado: **prototipo tecnicamente montado numa branch de integracao**, com identidade Sevelora e catalogo editorial. Ainda nao foi publicado na VPS nem tem ofertas reais. Nome de trabalho aceite em 16-11-2026; uso comercial depende de verificacao de marca e dominio.
> Este repositorio e publico. Nao guardar segredos, tokens Awin, credenciais VPS ou dados pessoais.

## Objetivo

Criar uma loja profissional de **afiliacao** para publico adulto em Portugal, com expansao posterior para Espanha.
A loja apresenta informacao propria sobre produtos de bem-estar intimo e liga o visitante
as lojas parceiras aprovadas. A compra, o pagamento, a entrega e as devolucoes decorrem no fornecedor.

- Sem dropshipping, sem pagamentos locais e sem carrinho ou checkout proprio.
- Sem publicar promessas de entrega, preco ou stock nao verificados.
- Sem catalogos, fotografias, marcas ou links de afiliado sem autorizacao do parceiro.
- Proposta de fornecedores a validar na Awin: Diversual, EasyToys e Kiiroo.
- Desenvolvimento e teste em `sexy-shop.duckdns.org`; dominio comercial por decidir.
- Projeto independente dos outros repositorios; VPS com pasta `Sexshop`.
- GitHub publico, segredos apenas no cofre autorizado da VPS.

## Base de design escolhida

[DemoShop Nuvi](https://github.com/sajanv88/nextjs-ecommerce-shop-demo)
— Next.js, layout de boutique, catalogo, filtros, pesquisa e elementos de SEO.
Licenca de codigo [MIT](https://github.com/sajanv88/nextjs-ecommerce-shop-demo/blob/main/LICENSE).
**A licenca do codigo nao inclui automaticamente todas as fotografias e textos de demonstracao.**
Nao importar esses conteudos para uma publicacao comercial.

## Adaptacao prevista

1. Substituir a marca e o tema grafico por uma identidade original de bem-estar intimo.
2. Substituir a navegacao e as colecoes do modelo de vestuario.
3. Remover checkout, carrinho, contas de clientes, depoimentos ficticios e dados de exemplo.
4. Implementar catalogo normalizado com artigos autorizados, preco EUR e atualizacao do feed.
5. Adicionar redirecionamento seguro para **links oficiais de afiliado Awin**, com contagem de cliques.
6. Criar paginas de produto e guias com informacao original, SEO em pt-PT; es-ES numa segunda fase.
7. Informar claramente que a compra se realiza no parceiro e incluir identificacao de publicidade/afiliacao.
8. Nao publicar o catalogo ate aos programas dos anunciantes aprovarem a parceria.
9. Validar em telemovel, acessibilidade, links, seguranca e deployment em isolamento.

## Identidade e referencias

- **Sevelora**: nome de trabalho aprovado para preparar o prototipo, ainda nao validado comercialmente.
- **Alerta**: [SELEVORA](https://selevora.com/) ja opera no segmento de beleza. Existe semelhanca relevante; consultar [EUIPO/TMview](https://www.euipo.europa.eu/pt/trade-marks/before-applying/availability) e INPI antes de escolher ou comprar dominio definitivo.
- Analise concreta de UX/estrutura de duas lojas portuguesas: [Cupido Shop e Afrodisia](docs/REFERENCIAS_CUPIDO_AFRODISIA.md).

## Estado real

- [x] Repositorio publico existente
- [x] Dominio DuckDNS indicado pelo titular
- [x] Modelo de afiliacao e base de design escolhidos
- [x] Nome de trabalho Sevelora aprovado pelo titular
- [ ] Disponibilidade da marca e dominio definitivo verificados
- [x] Codigo DemoShop Nuvi MIT importado na branch de integracao e adaptado com paginas originais (fonte pinada 6edcafc)
- [x] Pipeline configura build Next.js e testes HTTP/noindex antes de publicar o commit importado
- [ ] Inspecao visual final das capturas desktop/mobile
- [ ] Build e testes de seguranca concluidos
- [ ] Parcerias Awin e catalogos autorizados
- [x] Publicacao isolada na VPS / HTTPS testados (VPS Actions #43888022254)
- [ ] Certificacao final de navegacao e interacoes mobile no dominio publico

A versao de testes esta **publicada na VPS** em https://sexy-shop.duckdns.org/, na pasta /srv/projects/Sexshop, com Node privado, Nginx HTTPS e systemd. O GitHub Actions [#43888022254](https://github.com/martaxi-boss/VPS/actions/runs/43888022254) registou HTTPS e rotas publicas PASS, confirmando tambem que o servico Low Cost Europa se manteve ativo. Fonte implantada: commit \`ee600b7538799ef26c7cfe4270514f460b1a1d8c\`. Continua em staging e **nao** tem pagamentos, catalogos de fornecedores aprovados ou links Awin ativos.

[Branch de integracao](https://github.com/martaxi-boss/Sexshop/tree/integration/sevelora-nuvi-v1) · [PR de revisao](https://github.com/martaxi-boss/Sexshop/pull/1) · [Workflow de montagem](https://github.com/martaxi-boss/Sexshop/actions/workflows/assemble-sevelora.yml).