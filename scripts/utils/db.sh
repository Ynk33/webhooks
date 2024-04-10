#!/bin/sh
#!/bin/bash

source .env
MYSQL_CONNECT="mysql -u $DB_USER -p$DB_PASSWORD"

### Running command from $VAR example
# eval "${MYSQL_CONNECT} -e 'SHOW DATABASES;'"

# Check if the db exists
dbExists() {
  # PARAMETERS
  DB_NAME=$1

  # VARIABLES
  DATABASES=$(eval "${MYSQL_CONNECT} -e 'SHOW DATABASES;'")
  EVAL=$(echo $DATABASES | grep "$DB_NAME")
  
  # BODY
  if [ -z "${EVAL}" ];
  then
    echo ""
  else
    echo "found"
  fi
}

# Apply the dump of the project to its db
applyDump() {
  # PARAMETERS
  DB_NAME=$1
  PROJECT_PATH=$2
  FULL=

  # OPTIONS
  for i in $@
  do
    case $i in
      --full)
        FULL="_full"
        ;;
    esac
  done

  # VARIABLES
  DUMP_FILE=$PROJECT_PATH/dump$FULL.sql
  DUMP_TMP=$PROJECT_PATH/dump_temp.sql

  # BODY
  echo Applying dump$FULL.sql...
  # Create a temporary dump file and update it with the proper db name
  cp $DUMP_FILE $DUMP_TMP
  sed -i "s/[^\s/.\\]wordpress[^\s/.\\]/\`$DB_NAME\`/g" $DUMP_TMP
  # Apply the dump
  eval "${MYSQL_CONNECT} $DB_NAME < $DUMP_TMP"
  # Delete the dump file
  rm $DUMP_TMP
}

VAL=$(dbExists wordpress_yankawordpress_preprod)
echo $VAL
if [ -z "${VAL}" ]
then
  echo -e "\033[31mFail...\033[0m"
else
  echo -e "\033[32mSuccess!\033[0m"
fi