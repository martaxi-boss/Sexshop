# Sevelora — rastreio e submissões Google, 21/11/2026

## Resultado observado

- A página inicial já constava do índice Google na inspeção anterior de hoje.
- O produto de amostra /produto/43428124436 ainda não constava do índice.
- O teste em direto do próprio Google em 21/11/2026 às 02:08:41 (Portugal)
  confirmou: URL disponível para Google, obtenção com êxito, rastreio permitido,
  indexação permitida, canonical declarado igual ao URL do produto.
- O relatório global de páginas continua a processar dados e pede nova consulta
  dentro de cerca de um dia. Isto não é uma mensagem de falha do website.
- Não foi possível concluir a submissão individual: o Search Console devolveu
  “Ocorreu um problema ao enviar o seu pedido de indexação. Tente mais tarde.”
  O erro ocorreu também depois do teste em direto aprovado. Não foi apresentado
  qualquer comprovativo de pedido aceite; não o declarar submetido/concluído.

## Sitemaps

1. O XML e o TXT públicos responderam HTTP 200. O XML foi analisado sem erros
   de sintaxe e os dois formatos contêm exatamente as mesmas 162 URLs únicas,
   das quais 147 são produtos.
2. O robots.txt permite rastreio e anuncia ambos os formatos.
3. O reenvio do XML no Search Console teve confirmação de envio, mas o registo
   continuou a apresentar erro de obtenção/leitura, sem URLs descobertos.
4. Consolidou-se o painel na submissão TXT já processada com “Sucesso”,
   última leitura em 19/11/2026, 162 URLs descobertos.
5. Removeu-se apenas o registo de submissão XML redundante no Search Console.
   Não se apagou o ficheiro XML, nenhuma página, nenhum produto ou URL do índice.
   A vista final tem uma única submissão, TXT, em Sucesso.
6. Isto é uma escolha de formato de submissão suportado, não uma prova de que
   o Google passou a conseguir processar o XML nem de indexação dos 147 produtos.

## Prova Ferrari

Foi usada a ponte Ferrari original, sem alterar transporte, SSH, releases,
catálogo, credenciais, DNS ou o código publicado da Sevelora.

- Descoberta do contrato REA: run 44853672159, ZIP/report completed.
- Equipa Ruflo: sevelora-seo-20261121, anfitrião ChatGPT, papéis webcheck/review.
- Primeiro cenário: run 44853980001; XML/TXT/robots e produto capturados;
  corpo do catálogo indisponível por aborto de captura. O revisor pediu correção.
- A primeira mensagem de revisão usou um valor inválido (“rejected”) e foi
  rejeitada pelo validador antes de SSH; corrigiu-se para changes_requested
  num novo pedido, run 44854297196.
- Reensaio: run 44854396822, três cenários separados. Todos os cinco documentos
  de aceitação capturados com HTTP 200 e SHA-256 dos corpos verificado.
  Catálogo/produto: index, follow e canonical correto. Catálogo com 48 âncoras
  para produtos (não equivale a 48 produtos únicos).
- SHA-256 da evidência revista:
  cd581b9ce812cf29a219832c54f71839bd0551ca0ae18ae4546ec840eb247d94.
- Os cenários HTML têm eventos globais de assets incompletos por orçamento de
  captura, mas os documentos de aceitação estão completos e íntegros. Não
  certificar auditoria integral de recursos nem indexação Google a partir disto.
- A aprovação técnica é uma revisão explícita do anfitrião no papel reviewer.
  quality_gate automático not_certified não é um PASS semântico global.

## Fontes oficiais

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  — o formato TXT é suportado; Google não tem preferência entre os formatos.
- https://support.google.com/webmasters/answer/7451001
  — remover uma submissão do relatório não faz esquecer URLs.
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
  — sitemap para muitas URLs; pedidos individuais têm quota e não garantem
  inclusão imediata no índice.

O processamento do índice é decisão externa do Google. Não existe confirmação
de indexação de todo o catálogo nesta verificação.

## Fecho verificado

Equipa concluída no [run 44854716850](https://github.com/martaxi-boss/VPS/actions/runs/44854716850).
ZIP exterior e response.zip descarregados e verificados; report.json e estado
Ruflo completed, tarefa crawlability approved, duas chamadas reais de ferramenta
e duas revisões (uma com correções pedidas, outra aprovada). A conclusão é da
auditoria técnica e das ações possíveis no painel; não da indexação do catálogo.
