#!/usr/bin/env bash

cd $(dirname $0)

nodemon server.js --watch server --ignore server/database/data_files/ &
ng serve --host=0.0.0.0 --port 80
