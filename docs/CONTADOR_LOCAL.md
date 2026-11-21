# Contador local Sevelora

Adaptado do contador de referências Nginx do Low Cost Europa, sem serviços pagos,
cookies, pixels externos ou dependências Python adicionais.

- Fonte exclusiva: /var/log/nginx/sevelora.access.log e rotações.
- Relatório privado: /srv/projects/Sexshop/.local-metrics/traffic.json (0600).
- Início real da medição: recording-started.txt; não reconstruir visitas anteriores.
- GitHub Actions no repositório VPS instala, verifica e atualiza o agregado de hora
  a hora. O Summary da execução apresenta a contagem diária e origens.
- Distingue pedidos de páginas, pedidos Next.js RSC (navegação/pré-carregamento),
  Google, Meta, outros motores, referências internas e origem desconhecida.
- Robôs reconhecidos e ensaios marcados são excluídos dos pedidos de páginas.
- Não são pessoas únicas nem clientes confirmados. As referências podem ser
  omitidas ou falsificadas. Os cliques afiliados e vendas continuam na Awin.
- O JSON derivado não contém IP, user agent, referência integral, pesquisa ou
  identificadores de produtos. Os logs operacionais Nginx mantêm as permissões
  restritas e a rotação existente do servidor.
- O instalador só altera a configuração Nginx da Sevelora; guarda cópia privada,
  valida nginx -t e repõe a configuração se a validação/reload falhar. É idempotente.
- Os próximos deploys da configuração devem preservar a diretiva
  access_log /var/log/nginx/sevelora.access.log combined;
  O instalador volta a verificá-la em cada atualização agendada.

Validação: python3 -m unittest discover -s tests -p test_sevelora_metrics.py -v

## Google Search Console — verificação em 21/11/2026

A inspeção da página inicial https://sevelora.eu/ confirmou “O URL está no Google”
e “A página está indexada”. Último rastreio: 19/11/2026, 17:59:39,
Googlebot smartphone, obtenção com êxito, rastreio e indexação permitidos,
canonical https://sevelora.eu/.

O sitemap TXT foi lido com Sucesso em 19/11/2026, com 162 URLs descobertos.
O sitemap XML ainda apresentava “Não foi possível obter”, sem última leitura;
o TXT oferece o mesmo conjunto de URLs. O relatório global de páginas ainda
estava a processar dados: 162 URLs descobertos não equivale a 162 indexados.
O produto de amostra /produto/43428124436 ainda não estava no índice
(“A Google não reconhece o URL”).
