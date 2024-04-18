#!/bin/sh
#!/bin/bash

## Variables
PROJECT_NAME=$1
PROJECT_PATH=$2
URL=$3
SUFFIX="$4"

## Sourcing
source .env
source ./scripts/utils/server-block.sh
source ./scripts/utils/certbot.sh

## Create server block
# BUG: /bin/sh: 2: -preprod: not found
echo "##### setupServer.sh: $SUFFIX"
configureServerBlockNext $PROJECT_NAME $PROJECT_PATH $URL $SUFFIX

# Reload Nginx
echo Reloading Nginx...
service nginx reload

## Setup HTTPS with Certbot
certifyHTTPS $URL