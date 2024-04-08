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
source .env
URL=$PROJECT_NAME$SUFFIX.$DOMAIN
PROJECT_PATH=$ROOT_PATH/$URL
REPO_URL=$GITHUB/$PROJECT_NAME

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
sed -i "s|__PATH__|$PROJECT_PATH|g" $CONFIG_PATH$URL
sed -i "s|__URL__|$URL|g" $CONFIG_PATH$URL

echo Creating symbolic link...
ln -s $CONFIG_PATH$URL $LN_PATH

echo Reloading Nginx...
service nginx reload

# Setup HTTPS with Certbot
echo Certifying HTTPS with Certbot...
certbot --nginx -d $URL -d www.$URL -n

# Create new db
DB_SUFFIX="${SUFFIX/-preprod/_preprod}"
DB_FULL_NAME="$DB_NAME_PREFIX$PROJECT_NAME$DB_SUFFIX"

echo Creating new database $DB_FULL_NAME...
echo "CREATE DATABASE $DB_FULL_NAME"
mysql -u $DB_USER -p$DB_PASSWORD -e "CREATE DATABASE $DB_FULL_NAME"

# Give wpadmin priviledges on this db
echo Updating privileges...
echo "GRANT ALL ON $DB_FULL_NAME.* TO 'wpadmin'@'localhost' IDENTIFIED BY '$DB_WPADMIN_PASSWORD' WITH GRANT OPTION"
mysql -u $DB_USER -p$DB_PASSWORD -e "GRANT ALL ON $DB_FULL_NAME.* TO 'wpadmin'@'localhost' IDENTIFIED BY '$DB_WPADMIN_PASSWORD' WITH GRANT OPTION"
echo "FLUSH PRIVILEGES"
mysql -u $DB_USER -p$DB_PASSWORD -e "FLUSH PRIVILEGES"

# Apply dump_full.sql on db
echo Applying dump_full.sql...
echo "use $DB_FULL_NAME; source $PROJECT_PATH/dump_full.sql"
mysql -u $DB_USER -p$DB_PASSWORD -e "use $DB_FULL_NAME; source $PROJECT_PATH/dump_full.sql"

# Update wp-config.php with new salts and all db information
echo Create wp-config.php...
cp $PROJECT_PATH/wp-config-sample.php $PROJECT_PATH/wp-config.php

# DB config
echo Update DB config in wp-config.php...
sed -i "0,/database_name_here/{s/database_name_here/$DB_FULL_NAME/}" $PROJECT_PATH/wp-config.php
sed -i "0,/username_here/{s/username_here/$DB_USER/}" $PROJECT_PATH/wp-config.php
sed -i "0,/password_here/{s/password_here/$DB_PASSWORD/}" $PROJECT_PATH/wp-config.php

# Salts
echo Update salts in wp-config.php...
SALT=$(curl -L https://api.wordpress.org/secret-key/1.1/salt/)
STRING='put your unique phrase here'
printf '%s\n' "g/$STRING/d" a "$SALT" . w | ed -s $PROJECT_PATH/wp-config.php

# The end
echo -e "\033[32mDeployment complete!\033[0m"