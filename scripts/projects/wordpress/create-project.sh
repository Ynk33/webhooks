#!/bin/sh
#!/bin/bash

### FIRST DEPLOY

## Variables
# $1: Project name
PROJECT_NAME=$1
SUFFIX=""
BRANCH="main"

## Options
shift
for i in $@
do
  case $i in
    --preprod)
      SUFFIX="-preprod"
      BRANCH="develop"
      ;;
    *)
      echo "Error: Invalid option $i"
      exit
      ;;
  esac
done

## Sourcing
source .env
source ./scripts/utils/db.sh
source ./scripts/utils/server-block.sh
source ./scripts/utils/certbot.sh

## Setting variables
URL=$PROJECT_NAME$SUFFIX.$DOMAIN
PROJECT_PATH=$ROOT_PATH/$URL
REPO_URL=$GITHUB/$PROJECT_NAME

DB_SUFFIX="${SUFFIX/-preprod/_preprod}"
DB_FULL_NAME="$DB_NAME_PREFIX$PROJECT_NAME$DB_SUFFIX"

## Git clone project
echo Cloning $REPO_URL at $PROJECT_PATH...
su - yanka -c "git clone --branch $BRANCH --recurse-submodules $REPO_URL $PROJECT_PATH"

## Create server block
configureServerBlockWordpress $PROJECT_NAME $PROJECT_PATH $URL $SUFFIX

# Reload Nginx
echo Reloading Nginx...
service nginx reload

## Setup HTTPS with Certbot
certifyHTTPS $URL

## Create new db
createDb $DB_FULL_NAME

## Give wpadmin priviledges on this db
grantPrivileges $DB_FULL_NAME

## Update wp-config.php with new salts and all db information
echo Create wp-config.php...
su - yanka -c "cp $PROJECT_PATH/wp-config-sample.php $PROJECT_PATH/wp-config.php"

## DB config in wp-config.php
echo Update DB config in wp-config.php...
sed -i "0,/database_name_here/{s/database_name_here/$DB_FULL_NAME/}" $PROJECT_PATH/wp-config.php
sed -i "0,/username_here/{s/username_here/$DB_USER/}" $PROJECT_PATH/wp-config.php
sed -i "0,/password_here/{s/password_here/$DB_PASSWORD/}" $PROJECT_PATH/wp-config.php

## Salts
echo Update salts in wp-config.php...
SALT=$(curl -L https://api.wordpress.org/secret-key/1.1/salt/)
STRING='put your unique phrase here'
printf '%s\n' "g/$STRING/d" a "$SALT" . w | ed -s $PROJECT_PATH/wp-config.php

## The end
echo -e "\033[32mDeployment complete!\033[0m"