#!/bin/sh
#!/bin/bash

su yanka
cd /var/www/webhooks

echo Connected as $(whoami) at $(pwd)

echo Pulling updates...
git pull

echo Installing dependencies...
npm install

echo Building project...
npm run build

echo Restart daemon...
# pm2 restart webhooks

echo -e "\033[32mDone!\033[0m Webhooks updated and running."