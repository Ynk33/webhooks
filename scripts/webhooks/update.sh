#!/bin/sh
#!/bin/bash

PATH=/var/www/webhooks

echo Connected as $(whoami) at $(pwd)

echo Pulling updates...
su - yanka -c "cd $PATH && git pull"

echo Installing dependencies...
su - yanka -c "cd $PATH && npm install"

echo Building project...
su - yanka -c "cd $PATH && npm run build"

echo Restart daemon...
 pm2 restart webhooks

echo -e "\033[32mDone!\033[0m Webhooks updated and running."