#!/bin/sh
#!/bin/bash

### UPDATE

## Variables
# $1: Project name
PROJECT_NAME=$1
SUFFIX=""
UPDATE_DB=""

## Options
shift
for i in $@
do
  case $i in
    --preprod)
      SUFFIX="-preprod"
      ;;
    --db)
      UPDATE_DB="true"
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

DB_SUFFIX="${SUFFIX/-preprod/_preprod}"
DB_FULL_NAME="$DB_NAME_PREFIX$PROJECT_NAME$DB_SUFFIX"

## Git pull changes
su - yanka -c "cd $PROJECT_PATH && git pull --recurse-submodules"

# In case of prod, if there is a preprod, use a dump of the preprod db. Otherwise, use the dump in the project.
if [ ! -z $UPDATE_DB ]
then
  ## Truncate all tables
  truncateAllTables $DB_FULL_NAME

  if [ ! -z $SUFFIX ]
  then
    ## Apply dump.sql
    applyDump $DB_FULL_NAME $PROJECT_PATH
  else
    # Check if there is a preprod db
    echo "Checking if ${DB_FULL_NAME}_preprod exists..."
    DB_EXIST=$(dbExists $DB_FULL_NAME"_preprod")
    if [ -z "${DB_EXIST}" ]
    then
      # No preprod
      ## Apply dump.sql
      applyDump $DB_FULL_NAME $PROJECT_PATH
    else
      ### Preprod exists: use a dump of the preprod db to fill the prod db
      applyDumpFromPreprod $DB_FULL_NAME
    fi
  fi
  
  ## Updates options in the database
  updateWpOptions $DB_FULL_NAME $URL
fi

## Reverting changes
echo Cleaning up...
su - yanka -c "cd $PROJECT_PATH && git checkout -- ."

## The end
echo -e "\033[32mDeployment complete!\033[0m"