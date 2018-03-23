#!/usr/bin/env bash

set -e  # Exit if any command fails
cd $(dirname $0)

# Build front-end
$(npm bin)/ng build --prod --aot

# Compile server-side
$(npm bin)/tsc --project server/tsconfig.server.json

# Copy server resource files (i.e. non-Typescript files)
for file in $(find server -type f ! -name "*.ts"); do
  target_dir="dist/$(dirname ${file})"
  test -d ${target_dir} || mkdir -p ${target_dir}
  cp ${file} ${target_dir}
done

cp -r ssl dist/ssl
