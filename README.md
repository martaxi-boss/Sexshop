# Sexshop — projeto de loja de afiliados

> Estado: **preparacao**. A marca sugerida **Sevelora** e provisoria ate aprovacao do titular.
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

## Nomes candidatos (nao registados)

- **Sevelora** — preferido para o prototipo; discreto e internacional.
- **Lusensia** — nome relacionado com sensacoes e bem-estar.
- **Serevya** — nome curto e de tom premium.

A pesquisa web inicial nao equivale a verificacao de dominio, marca comercial ou registo EUIPO.
Antes de comprar um dominio definitivo, verificar disponibilidade e conflitos de marca.

## Estado real

- [x] Repositorio publico existente
- [x] Dominio DuckDNS indicado pelo titular
- [x] Modelo de afiliacao e base de design escolhidos
- [ ] Marca e dominio definitivo aprovados
- [ ] Codigo DemoShop Nuvi importado e adaptado
- [ ] Build e testes de seguranca concluidos
- [ ] Parcerias Awin e catalogos autorizados
- [ ] Publicacao na VPS / HTTPS testados

Este README e uma especificacao inicial, **nao** uma loja ja instalada ou publicada.
