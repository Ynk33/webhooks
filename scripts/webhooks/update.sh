#!/bin/sh
#!/bin/bash

source .env

echo Pulling updates...
su - yanka -c "cd ${ROOT_PATH}/webhooks && git pull"

echo Installing dependencies...
su - yanka -c "cd ${ROOT_PATH}/webhooks && npm install"

echo Building project...
su - yanka -c "cd ${ROOT_PATH}/webhooks && npm run build"

echo Restart daemon...
pm2 restart webhooks --time

echo -e "\033[32mDone!\033[0m Webhooks updated and running."