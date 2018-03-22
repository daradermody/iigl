#!/bin/bash

# Add this to the crontab as the web administrator:
#     0 0 * * * /path/to/backup_script.sh /path/to/backups/


function main() {
    set -e  # Exit if any command fails
    cd $(dirname $0)

    if [[ "$#" -ne 1 ]]; then
        echo "Usage: $0 BACKUPS_DIRECTORY"
        exit 1
    fi

    DESTINATION="$1/iigl_backup_$(date +%Y-%m-%d).tar.gz"
    tar --create --preserve-permissions --gzip --file ${DESTINATION} database/data_files
}

main $@
