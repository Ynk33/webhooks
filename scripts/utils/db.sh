#!/bin/sh
#!/bin/bash

source .env
MYSQL_CONNECT="mysql -u $DB_USER -p$DB_PASSWORD"

### Running command from $VAR example
# eval "${MYSQL_CONNECT} -e 'SHOW DATABASES;'"

# Apply the dump of the project to the project db
applyDump() {

  # Variables from parameters
  DB_NAME=$1
  PROJECT_PATH=$2
  FULL=

  # Options
  for i in $@
  do
    case $i in
      --full)
        FULL="_full"
        ;;
    esac
  done

  # Script

  echo Applying dump_full.sql...
  sed -i "s/[^\s/.\\]wordpress[^\s/.\\]/\`$DB_NAME\`/g" $PROJECT_PATH/dump$FULL.sql
  eval "${MYSQL_CONNECT} $DB_NAME < $PROJECT_PATH/dump$FULL.sql"
}