#!/bin/bash
cd /home/opt/back-end/
sudo npm run build:prod
sudo pm2 start -f index.js --watch