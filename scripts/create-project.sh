#!/bin/sh
#!/bin/bash

### FIRST DEPLOY

## Variables
# $1: Project name
PROJECT_NAME=$1
SUFFIX=""

## Options
shift
for i in $@
do
  case $i in
    --preprod)
      SUFFIX="-preprod"
      ;;
    *)
      echo "Error: Invalid option $i"
      exit
      ;;
  esac
done

## Setting variables
URL=$PROJECT_NAME$SUFFIX.yankadevlab.tech
PROJECT_PATH="/var/www/$URL"
CONFIG_PATH="/etc/nginx/sites-available/"
LN_PATH="/etc/nginx/sites-enabled"
REPO_URL=git@github.com:Ynk33/$PROJECT_NAME

# Create folder
echo Creating folder at $PROJECT_PATH...
mkdir $PROJECT_PATH

# Git clone project
echo Cloning $REPO_URL at $PROJECT_PATH...
su - yanka -c "git clone $REPO_URL $PROJECT_PATH"

echo Updating rights...
chown -R yanka:yanka $PROJECT_PATH
chmod -R 755 $PROJECT_PATH

# Create server block
echo Creating Nginx server block at $CONFIG_PATH$URL...
cp $CONFIG_PATH"template" $CONFIG_PATH$URL

echo Updating server block...
sed -i "s/__PATH__/$PROJECT_PATH/g" $CONFIG_PATH$URL
sed -i "s/__URL__/$URL/g" $CONFIG_PATH$URL

echo Creating symbolic link...
ln -s $PROJECT_PATH /etc/nginx/sites-enabled

echo Reloading Nginx...
service nginx reload

# Setup HTTPS with Certbot
echo Certifying HTTPS with Certbot...
certbot --nginx -d $URL -d www.$URL

# Create new db

# Give wpadmin priviledges on this db

# Apply dump_full.sql on db

# Update wp-config.php with new salts and all db information