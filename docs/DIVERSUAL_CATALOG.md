# Diversual catalog integration

Sevelora is isolated in martaxi-boss/Sexshop and /srv/projects/Sexshop. Source is maintained on integration/sevelora-nuvi-v1; main is not the application branch. Every app override is mirrored in overrides/apps so the assembly workflow preserves it.

Approved Awin program: Diversual ES 37722. Publisher: 3157353. Feed: 78949, Feed productos marca Diversual. The first export on 2026-11-18 contains 151 products. The feed represents only the supplier's Awin selection, not its full store. There is no checkout in Sevelora. Awin pclick URLs retain the publisher, merchant and product IDs supplied by the feed. Links are labelled affiliate and sponsored/nofollow, with the existing standard referrer policy preserved.

## Operations

- Private feed URL: /srv/projects/Sexshop/.private/diversual-feed-url (0600, ubuntu). Never copy it to source, logs, HTML, browser JavaScript or Actions output.
- Public repository contains only an RSA-OAEP/AES-256-GCM encrypted envelope for installation. Only the VPS holds its temporary decryption private key. Delete that temporary key after successful activation; the catalog URL stays private.
- Importer: scripts/sync-diversual.mjs, installed at /srv/projects/Sexshop/infra/sync-diversual.mjs, using the project's existing private Node26 runtime.
- Data: /srv/projects/Sexshop/data/catalog.json (atomic write). Previous valid file survives download, schema and validation failures. Importer only accepts the approved merchant/feed, HTTPS Awin tracking links for publisher3157353, official Diversual images, unique numeric product IDs.
- Refresh: sexshop-catalog-sync.service and sexshop-catalog-sync.timer, every six hours with jitter. Check with systemctl status/list-timers and journalctl for these units only. Logs contain counts and timestamps, not credentials.
- SSR reads catalog on each request. Data older than72h hides offers until refreshed. Search is accent-insensitive; categories are editorial keyword classifications, not supplier category guarantees. Empty categories show an honest empty state. Stock=0 disables the outbound CTA.
- Initial feed reports GBP for all151 prices. Values resemble EUR prices on the store, but currency is not overridden or converted. Non-EUR/invalid prices are suppressed and the site says price in store. Automatic EUR display starts only when the supplier feed returns valid EUR values. Names/descriptions remain supplier-original Spanish, clearly labelled.
- Shipping to Portugal, shipping charges, final price, taxes, returns and availability must be confirmed in Diversual checkout. No delivery or free-shipping claims are invented.

## Deployment and rollback

Use the existing pinned VPS SSH transport in martaxi-boss/VPS, with the existing secret, host fingerprint and project-only release directories. Build standalone off-host. Activate a new /srv/projects/Sexshop/releases/SHA/app using the current symlink and restart only sexshop.service; retain the previous symlink target for rollback. No runtime dependencies are installed globally on the VPS and no other sites are changed. Existing staging noindex remains until a separate launch decision.

Validation: node scripts/catalog-test.mjs, pnpm --dir apps/ecommerce-shop-demo build, scripts/smoke.mjs against the built site, then public browser tests for product counts, categories/search, detail/affiliate CTA, image loading and desktop/mobile layout. A successful redirect is not proof of a future commission; actual commission requires a valid sale and advertiser approval.
