#!/bin/bash -e

DEPLOY_FOLDER=$(echo $(date +%Y%m%d-%H%M%S-%N))
echo "export DEPLOY_FOLDER=\"$DEPLOY_FOLDER\"" > "/tmp/env"
cd /home/app/${APPLICATION_NAME}/

if [[ -f ecosystem.config.js ]]; then
  pm2 delete ecosystem.config.js
else
  echo "First deploy"
fi

mkdir -p /home/app/${APPLICATION_NAME}/releases/

cp -r /home/app/.tmp /home/app/${APPLICATION_NAME}/releases/$DEPLOY_FOLDER

ln -s /home/app/${APPLICATION_NAME}/releases/$DEPLOY_FOLDER /home/app/${APPLICATION_NAME}/current

cd /home/app/${APPLICATION_NAME}/current/
yarn install
