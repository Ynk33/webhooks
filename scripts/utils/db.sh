#!/bin/sh
#!/bin/bash

source .env

# SAVED COMMANDS
MYSQL_CONNECT="mysql -u $DB_USER -p$DB_PASSWORD"

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

# Create a new db
createDb() {
  # PARAMETERS
  DB_NAME=$1

  # BODY
  echo Creating new database $DB_FULL_NAME...
  echo "CREATE DATABASE $DB_NAME"
  eval "${MYSQL_CONNECT} -e 'CREATE DATABASE $DB_NAME;'"
}

# Grant all privileges on the db to wpadmin
grantPrivileges() {
  # PARAMETERS
  DB_NAME=$1

  # BODY
  echo Updating privileges...
  eval "${MYSQL_CONNECT} -e 'GRANT ALL ON $DB_FULL_NAME.* TO \'wpadmin\'@\'localhost\' IDENTIFIED BY \'$DB_WPADMIN_PASSWORD\' WITH GRANT OPTION;'"
  eval "${MYSQL_CONNECT} -e 'FLUSH PRIVILEGES;'"
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

# Update wp_options table with the proper url
updateWpOptions() {
  # PARAMETERS
  DB_NAME=$1
  URL=$2

  # BODY
  echo Updating URL in TABLE wp_options...
  eval "${MYSQL_CONNECT} -e 'UPDATE $DB_NAME.wp_options SET option_value = \'https://$URL\' WHERE option_name = \'siteurl\';'"
  eval "${MYSQL_CONNECT} -e 'UPDATE $DB_NAME.wp_options SET option_value = \'https://$URL\' WHERE option_name = \'home\';'"
}

# Truncate all table from a db
truncateAllTables() {
  # PARAMETERS
  DB_NAME=$1

  # BODY
  echo Truncate all tables in $DB_NAME...
  eval "${MYSQL_CONNECT} -Nse 'show tables' $DB_NAME" |
    while read table;
    do 
      eval "${MYSQL_CONNECT} -e 'TRUNCATE TABLE $table' $DB_NAME;"
    done
}
