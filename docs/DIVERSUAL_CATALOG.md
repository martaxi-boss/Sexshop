# Diversual catalog integration

Sevelora is isolated in martaxi-boss/Sexshop and /srv/projects/Sexshop. Source is maintained on integration/sevelora-nuvi-v1; main is not the application branch. Every app override is mirrored in overrides/apps so the assembly workflow preserves it.

Approved Awin program: Diversual ES 37722. Publisher: 3157353. Feed: 78949, Feed productos marca Diversual. The first export on 2026-11-18 contains 151 products. The feed represents only the supplier's Awin selection, not its full store. There is no checkout in Sevelora. Awin pclick URLs retain the publisher, merchant and product IDs supplied by the feed. Links are labelled affiliate and sponsored/nofollow, with the existing standard referrer policy preserved.

## Operations

- Private feed URL: /srv/projects/Sexshop/.private/diversual-feed-url (0600, ubuntu). Never copy it to source, logs, HTML, browser JavaScript or Actions output.
- Public repository contains only an RSA-OAEP/AES-256-GCM encrypted envelope for installation. Only the VPS holds its temporary decryption private key. Delete that temporary key after successful activation; the catalog URL stays private.
- Importer: scripts/sync-diversual.mjs, installed at /srv/projects/Sexshop/infra/sync-diversual.mjs, using the project's existing private Node26 runtime.
- Data: /srv/projects/Sexshop/data/catalog.json (atomic write). Previous valid file survives download, schema and validation failures. Importer only accepts the approved merchant/feed, HTTPS Awin tracking links for publisher3157353, official Diversual images or the Awin productserve image supplied by the same feed, unique numeric product IDs.
- Refresh: sexshop-catalog-sync.service and sexshop-catalog-sync.timer, every six hours with jitter. Check with systemctl status/list-timers and journalctl for these units only. Logs contain counts and timestamps, not credentials.
- SSR reads catalog on each request. Data older than72h hides offers until refreshed. Search is accent-insensitive; categories are editorial keyword classifications, not supplier category guarantees. Empty categories show an honest empty state. Stock=0 disables the outbound CTA.
- On 2026-11-18, all 151 Awin prices were mislabelled as GBP, while 11 sampled items had the same numbers in official Diversual EUR product offers. Importer now checks each GBP-labelled product's own official product page (structured Product/Offer, exact canonical product path, priceCurrency EUR) before populating its verified EUR price; it does not make an FX conversion or blindly relabel the feed. If confirmation fails, that specific price remains hidden; the seller is still authoritative at checkout. Prices with EUR correctly indicated by Awin continue to work natively. The feed remains authoritative for affiliation/stock/product IDs. Names/descriptions remain supplier-original Spanish, clearly labelled.
- Shipping to Portugal, shipping charges, final price, taxes, returns and availability must be confirmed in Diversual checkout. No delivery or free-shipping claims are invented.

## Deployment and rollback

Use the existing pinned VPS SSH transport in martaxi-boss/VPS, with the existing secret, host fingerprint and project-only release directories. Build standalone off-host. Activate a new /srv/projects/Sexshop/releases/SHA/app using the current symlink and restart only sexshop.service; retain the previous symlink target for rollback. No runtime dependencies are installed globally on the VPS and no other sites are changed. Existing staging noindex remains until a separate launch decision.

Validation: node scripts/catalog-test.mjs, pnpm --dir apps/ecommerce-shop-demo build, scripts/smoke.mjs against the built site, then public browser tests for product counts, categories/search, detail/affiliate CTA, image loading and desktop/mobile layout. A successful redirect is not proof of a future commission; actual commission requires a valid sale and advertiser approval.

Image delivery uses the official Awin productserve URL when supplied, validating its feed ID and original Diversual image. This avoids broken direct merchant images in restricted browser networks. No arbitrary image-proxy endpoint is exposed.

## Português de Portugal e classificação comercial — 2026-11-19

- Os 151 produtos do feed Diversual foram revistos individualmente para nome, descrição resumida fiel ao fornecedor, categoria e subcategoria em português de Portugal.
- A origem só fornece "Juguetes eróticos" como merchant_category para os 151 produtos; não suporta uma árvore de categorias de sex shop. A classificação a partir de palavras de descrição provocava erros de navegação.
- Fonte editorial por ID: scripts/diversual-ptpt-01.mjs + scripts/diversual-ptpt-02.mjs, verificada por scripts/diversual-ptpt.mjs. Nunca classificar por palavras soltas.
- Das 151 entradas, três são embalagens de envio Diversual, não produtos sexuais de consumo; ficam fora do catálogo público, mantendo-se 148 artigos comerciais quando o feed não mudar. Este número não é expansão do feed.
- Novos IDs ficam temporariamente fora do site e surgem no contador unreviewedProducts até classificação e tradução aprovadas; URLs e dados de fornecedor continuam verificados.
- Categorias sem produtos não aparecem na navegação da loja. Subcategorias são filtradas pelo identificador curado, não por pesquisa textual.
- Descrições são adaptações PT de 1 a 2 frases com factos confirmados no texto original; o detalhe integral e as especificações finais continuam na Diversual. Nunca inventar materiais, propriedades médicas, preços ou disponibilidade.
- A atualização do feed mantém o mecanismo de validação individual de preços EUR e o rastreio Awin aprovados.
