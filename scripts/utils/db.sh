#!/bin/sh
#!/bin/bash

source .env
MYSQL_CONNECT="mysql -u $DB_USER -p$DB_PASSWORD"

eval ${MYSQL_CONNECT} -e 'SHOW DATABASES;'