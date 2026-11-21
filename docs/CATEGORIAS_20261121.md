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
