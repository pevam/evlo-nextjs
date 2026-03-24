#!/bin/bash
# SSH Script to build EVLO app

sshpass -p 'sdk8potka' ssh -p 5050 waxeesi@mp10.si << 'SSHCOMMAND'
cd /home/waxeesi/public_html/evlo-app
npm install
npm run build
exit
SSHCOMMAND
