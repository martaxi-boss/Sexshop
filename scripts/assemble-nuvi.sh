#!/usr/bin/env bash
set -Eeuo pipefail
# MIT upstream pinado; nenhum codigo, foto ou texto da Cupido/Afrodisia e copiado.
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UPSTREAM_URL="https://github.com/sajanv88/nextjs-ecommerce-shop-demo.git"
UPSTREAM_SHA="6edcafca3ef93f0171a8c86a558d16daa90eea9e"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cd "$ROOT"
if [[ ! -f "overrides/apps/ecommerce-shop-demo/src/app/page.tsx" ]]; then
  echo "ERROR: missing Sevelora overlay" >&2; exit 2
fi
git clone -q --filter=blob:none "$UPSTREAM_URL" "$TMP/nuvi"
git -C "$TMP/nuvi" checkout -q --detach "$UPSTREAM_SHA"
ACTUAL="$(git -C "$TMP/nuvi" rev-parse HEAD)"
[[ "$ACTUAL" == "$UPSTREAM_SHA" ]] || { echo "ERROR: upstream mismatch" >&2; exit 3; }

mkdir -p apps packages
rsync -a --delete --exclude=public/ "$TMP/nuvi/apps/" "$ROOT/apps/"
rsync -a --delete "$TMP/nuvi/packages/" "$ROOT/packages/"
for file in package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json .npmrc .node-version .gitignore; do
  [[ -f "$TMP/nuvi/$file" ]] && cp "$TMP/nuvi/$file" "$ROOT/$file"
done
cp "$TMP/nuvi/LICENSE" "$ROOT/LICENSE.upstream"
# Elimina paginas, fotos e checkout do comercio de vestuario original.
rm -rf "$ROOT/apps/ecommerce-shop-demo/src/app"
find "$ROOT/apps/ecommerce-shop-demo" -type d -name "public" -prune -exec rm -rf {} +
# Reutiliza a infraestrutura e componentes MIT mantendo a identidade original de marca.
cp -a "$ROOT/overrides/apps/." "$ROOT/apps/"
if find "$ROOT/apps" -type f \( -name '*.env' -o -name '*.pem' -o -name '*.p12' -o -name 'id_rsa' \) | grep -q .; then
  echo "ERROR: secret-like file in import" >&2; exit 4
fi
echo "SEVELORA_ASSEMBLY_OK upstream=$ACTUAL"
echo "Next src files: $(find apps/ecommerce-shop-demo/src -type f | wc -l)"
echo "Original Sevelora pages: $(find apps/ecommerce-shop-demo/src/app -name 'page.tsx' | wc -l)"
