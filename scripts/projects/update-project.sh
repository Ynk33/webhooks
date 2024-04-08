#!/bin/sh
#!/bin/bash

### UPDATE

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

## Git pull changes
su - yanka -c "cd $PROJECT_PATH && git pull --recurse-submodules"

## Truncate all tables
DB_SUFFIX="${SUFFIX/-preprod/_preprod}"
DB_FULL_NAME="$DB_NAME_PREFIX$PROJECT_NAME$DB_SUFFIX"

mysql -u $DB_USER -p$DB_PASSWORD -Nse 'show tables' $DB_FULL_NAME |
  while read table;
  do 
    mysql -u $DB_USER -p$DB_PASSWORD -e "TRUNCATE TABLE $table" $DB_FULL_NAME;
  done

## Apply dump.sql
echo Applying dump.sql...
sed -i "s/[^\s/.\\]wordpress[^\s/.\\]/\`$DB_FULL_NAME\`/g" $PROJECT_PATH/dump.sql
mysql -u $DB_USER -p$DB_PASSWORD $DB_FULL_NAME < $PROJECT_PATH/dump_full.sql

## Reverting changes
echo Reverting temporary changes...
su - yanka -c "cd $PROJECT_PATH && git checkout -- ."

## The end
echo -e "\033[32mDeployment complete!\033[0m"