#!/usr/bin/env bash

ARGS=$*

function main() {
  set -e  # Exit if any command fails
  cd $(dirname $0)
  if [[ ${ARGS} == *--prod* ]]; then
    start_prod_server
  else
    start_dev_server
  fi
}

function command_exists() {
  command -v "$1" >/dev/null
}

function start_prod_server() {
  if ! command_exists sudo && ! cygwin_run_as_administrator; then
    echo "Cygwin must be run as administrator"
    exit 1
  fi

  # Build front-end
  $(npm bin)/ng build --prod --aot

  # Compile server-side
  $(npm bin)/tsc --project server/tsconfig.server.json

  copy_resources_to_dist

  if command_exists sudo; then
    echo -e "\nUsing system port requires sudo privileges"
    sudo NODE_ENV=production PORT=443 node dist/server
  else
    NODE_ENV=production PORT=443 node dist/server
  fi
}

function copy_resources_to_dist() {
  # Copy server resource files (i.e. non-Typescript files)
  for file in $(find server -type f ! -name "*.ts"); do
    target_dir="dist/$(dirname ${file})"
    test -d ${target_dir} || mkdir -p ${target_dir}
    cp ${file} ${target_dir}
  done

  cp -r ssl dist/ssl
}
function cygwin_run_as_administrator() {
  id --groups | grep --quiet --extended-regexp '\<(114|544)\>'
}

function start_dev_server() {
  $(npm bin)/nodemon &
  trap "kill $!" EXIT SIGINT SIGKILL  # Kill all child process if this process is stopped/ends
  $(npm bin)/ng serve --open
}

main
