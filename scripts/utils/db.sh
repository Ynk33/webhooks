#!/bin/sh
#!/bin/bash

source .env

# SAVED COMMANDS
MYSQL_CONNECT="mysql -u $DB_USER -p$DB_PASSWORD"
MYSQL_DUMP="mysqldump -u $DB_USER -p$DB_PASSWORD"

# Check if the db exists
dbExists() {
  # PARAMETERS
  DB_NAME=$1

  # VARIABLES
  DATABASES=$($MYSQL_CONNECT -e "SHOW DATABASES;")
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
  $($MYSQL_CONNECT -e "CREATE DATABASE $DB_NAME;")
}

# Grant all privileges on the db to wpadmin
grantPrivileges() {
  # PARAMETERS
  DB_NAME=$1

  # BODY
  echo Updating privileges...
  $($MYSQL_CONNECT -e "GRANT ALL ON $DB_FULL_NAME.* TO 'wpadmin'@'localhost' IDENTIFIED BY '$DB_WPADMIN_PASSWORD' WITH GRANT OPTION;")
  $($MYSQL_CONNECT -e "FLUSH PRIVILEGES;")
}
