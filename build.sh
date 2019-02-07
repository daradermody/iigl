#!/usr/bin/env bash

set -e  # Exit if any command fails
cd $(dirname $0)

# Build front-end
npx ng build --prod --aot

# Compile server-side
npx tsc --project server/tsconfig.server.json
