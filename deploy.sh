#!/usr/bin/env bash

DIST_DIR="dist"

if [ ! -d "$DIST_DIR" ]; then
	deno task build
fi

if [ ! -f "package.json" ]; then
	grep '"homepage":' deno.jsonc | sed 's/.*: *"\(.*\)".*/{\n  "homepage": "\1"\n}/' > package.json
fi

deno run -A npm:gh-pages \
	--dist="$DIST_DIR" \
	--src='{index.html,*.png,assets/*.{js,css}}' \
	--remove='{*,.*,.*/*,.*/**/*}' \
	--branch=gh-pages \
	--message='[skip ci] deploy gh-pages' "$@"
