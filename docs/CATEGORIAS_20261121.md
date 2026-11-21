# Organização das categorias — 21/11/2026

Pedido do proprietário: eliminar a categoria BDSM, que continha apenas um artigo,
e colocar esse artigo nos kits.

- Kit BDSM Fantasy, ID público 44625061400, pertence agora à categoria principal
  jogos-acessorios (Kits & Acessórios) e ao tipo kits (Kits eróticos).
- A alteração está na curadoria do feed e permanece nas sincronizações.
- Categoria e tipo antigo retirados dos menus, filtros e gerador do sitemap.
- O nome e a descrição do produto mantêm a identificação do kit BDSM.
- /categoria/bdsm encaminha por HTTP 308 para /categoria/jogos-acessorios.
- Link afiliado do produto preservado: Awin publisher3157353/programa37722.
- Publicação aprovada: fonte7978a34a87ae7cd4325fdae748b1159ba91d4d1c,
  [VPS44856607186](https://github.com/martaxi-boss/VPS/actions/runs/44856607186).
- Validação pública após deploy:147produtos,161URLs nos sitemaps; nenhum
  /categoria/bdsm no HTML de navegação nem no sitemap. Kits contém o artigo;
  ficha do artigo mostra nova categoria e conserva linkAwin.
- O log dedicado do contador Sevelora foi preservado na configuração Nginx.
- Testes existentes atualizados: curadoria, smokeHTTP, redirecionamento e sitemap.
  A paginação continua a expor todos148artigos da fixture editorial; produção tem147.
- Build/TypeScript, smoke, paginação e publicação real concluídos com êxito.

## Verificação final

[Equipa Ferrari concluída e revista](https://github.com/martaxi-boss/VPS/actions/runs/44857342589).
ZIP e estados report/team verificados como completed; tarefa kits-public aprovada.
A captura inicial falhou e foi recuperada com seletor único do cartão e sem o
fetch redirecionado. A captura final confirma home, Kits, sitemap e apresentação
mobile (390 × 844). O corpo da ficha do produto ficou ausente nessa captura;
a categoria e o link de afiliação da ficha foram confirmados por HTTP público
independente pelo anfitrião. Não se afirma certificação desse corpo pelo Ferrari.

## Correção da categoria Massagem Erótica — 21/11/2026

- Kit Massage Experience com Feromonas, ID público 41817469190: transferido de Massagem Erótica para Kits & Acessórios / Kits eróticos na curadoria editorial do feed.
- Nome, descrição, fotografia, preço e ligação Awin continuam a ser fornecidos como antes; não eliminar o artigo do catálogo.
- A categoria Massagem Erótica mantém as velas e os óleos, sem filtro de kits vazio.
- Garantia por teste: categoria exclusiva `jogos-acessorios` e tipo `kits` para este ID em sincronizações futuras.

## Exclusão dos cabos magnéticos — 21/11/2026

- Por decisão do proprietário, os carregadores magnéticos USB Diversual M1 (43597976280), M2 (43597976281) e M3 (43597976282) deixam de aparecer no catálogo completo, nos resultados de pesquisa, na categoria Kits & Acessórios, nas fichas e no sitemap.
- A exclusão está fixada por ID na curadoria (`hiddenReason: owner_request`), sem alterar ou eliminar outros produtos, e mantém-se após a atualização automática do feed.
- O menu Kits & Acessórios deixa de anunciar carregadores; seguem válidos os kits, bolsas e livros.
- O contador `excludedByOwner` distingue as três exclusões editoriais das três embalagens de expedição (`excludedNonRetail`), permitindo conferir os totais sem perdas indevidas.

## Reclassificação Gemini / PelviCare — 21/11/2026

- Produtos verificados no catálogo Diversual «Suelo Pélvico»: Gemini Kegel Turquesa (`34454438111`), Gemini Kegel Cereja (`34454438113`), PelviCare Cereja (`46419192558`) e PelviCare Turquesa (`46419192559`).
- Os Gemini são conjuntos de bolas Kegel em duas cores. PelviCare é um estimulador vaginal associado a treino pélvico, em duas cores. Não são lubrificantes, géis ou cosmética.
- Correção final após esclarecimento do proprietário: os quatro artigos saem de `bem-estar` (Lubrificantes & Cuidados) e ficam em `estimuladores` (Vibradores & Dildos), sob o filtro «Exercitadores pélvicos» (`kegel`). A proposta inicial de os colocar em Kits & Acessórios foi rejeitada **antes da publicação** e não deve ser recuperada.
- Conservam-se IDs, nomes, descrições, imagens, stock, preços verificados e URLs Awin; as fichas continuam nas mesmas URLs e no sitemap. Apenas categoria principal e rótulo da subcategoria foram alterados.
- A regra `primaryCategoryByType` garante a classificação nas sincronizações seguintes. Testes impedem reaparição tanto em Lubrificantes & Cuidados como em Kits & Acessórios ou Prazer Anal; apenas os quatro IDs pertencem ao tipo `kegel`.
