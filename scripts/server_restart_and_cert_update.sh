#!/bin/sh

echo "CRON: Refreshing Let's Encrypt Certificates."
sudo cp /etc/letsencrypt/live/irishinterfirmsgaming.ie/fullchain.pem /home/webadmin/git/iigl/ssl/cert.pem
echo "CRON: Restarting iigl server"
pm2 restart iigl
