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

## Setting variables
source .env
source ./scripts/utils/db.sh

URL=$PROJECT_NAME$SUFFIX.$DOMAIN
PROJECT_PATH=$ROOT_PATH/$URL
REPO_URL=$GITHUB/$PROJECT_NAME

DB_SUFFIX="${SUFFIX/-preprod/_preprod}"
DB_FULL_NAME="$DB_NAME_PREFIX$PROJECT_NAME$DB_SUFFIX"

## Git clone project
echo Cloning $REPO_URL at $PROJECT_PATH...
su - yanka -c "git clone --branch $BRANCH --recurse-submodules $REPO_URL $PROJECT_PATH"

## Create server block
echo Creating Nginx server block at $CONFIG_PATH$URL...
cp $CONFIG_PATH"template$SUFFIX" $CONFIG_PATH$URL

echo Updating server block...
sed -i "s|__PATH__|$PROJECT_PATH|g" $CONFIG_PATH$URL
sed -i "s|__URL__|$URL|g" $CONFIG_PATH$URL

echo Creating symbolic link...
ln -s $CONFIG_PATH$URL $LN_PATH

# If preprod, configure .htpasswd
if [ ! -z $SUFFIX ]
then
  HTPASSWD_DIR=/etc/nginx/.passwd
  PROJECT_HTPASSWD_DIR=$HTPASSWD_DIR/$PROJECT_NAME$SUFFIX

  HTPASSWD=$HTPASSWD_DIR/.htpasswd
  PROJECT_HTPASSWD=$PROJECT_HTPASSWD_DIR/.htpasswd

  mkdir $PROJECT_HTPASSWD_DIR
  cp $HTPASSWD $PROJECT_HTPASSWD_DIR
  sed -i "s|$HTPASSWD|$PROJECT_HTPASSWD|g" $CONFIG_PATH$URL
fi

# Reload Nginx
echo Reloading Nginx...
service nginx reload

## Setup HTTPS with Certbot
echo Certifying HTTPS with Certbot...
certbot --nginx -d $URL -d www.$URL -n

## Create new db
createDb $DB_FULL_NAME

## Give wpadmin priviledges on this db
grantPrivileges $DB_FULL_NAME

# In case of prod, if there is a preprod, use a dump of the preprod db. Otherwise, use the dump in the project.
if [ ! -z $SUFFIX ]
then
  ## Apply dump.sql
  applyDump $DB_FULL_NAME $PROJECT_PATH --full
else
  # Check if there is a preprod db
  echo "Checking if ${DB_FULL_NAME}_preprod exists..."
  DB_EXIST=$(dbExists $DB_FULL_NAME"_preprod")
  if [ -z "${DB_EXIST}" ]
  then
    # No preprod
    ## Apply dump.sql
    applyDump $DB_FULL_NAME $PROJECT_PATH --full
  else
    ### Preprod exists: use a dump of the preprod db to fill the prod db
    applyDumpFromPreprod $DB_FULL_NAME
  fi
fi

## Updates options in the database
updateWpOptions $DB_FULL_NAME $URL

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

## Reverting changes
echo Cleaning up...
su - yanka -c "cd $PROJECT_PATH && git checkout -- ."

## The end
echo -e "\033[32mDeployment complete!\033[0m"