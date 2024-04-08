#!/bin/sh
#!/bin/bash

cd /var/www/webhooks

echo Pulling updates...
su - yanka -c "git pull"

echo Installing dependencies...
su - yanka -c "npm install"

echo Building project...
su - yanka -c "npm run build"

echo Restart daemon...
# pm2 restart webhooks

echo -e "\033[32mDone!\033[0m Webhooks updated and running."