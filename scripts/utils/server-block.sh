#!/bin/sh
#!/bin/bash

## Sourcing
source .env
###
# Sets:
# - CONFIG_PATH
# - LN_PATH
###

configureServerBlockWordpress() {
  configureServerBlock $1 $2 $3 $4 wordpress
}

configureServerBlockNext() {
  configureServerBlock $1 $2 $3 $4 next
}

# Creates a new server-block for Nginx and configure it for the current URL
configureServerBlock() {
  # PARAMETERS
  PROJECT_NAME=$1
  PROJECT_PATH=$2
  URL=$3
  SUFFIX=$4
  PROJECT_TYPE=$5

  ## BODY
  # Create server block
  copyTemplate $CONFIG_PATH"template-"$PROJECT_TYPE$SUFFIX $CONFIG_PATH$URL

  # Update server block
  updateURL $PROJECT_PATH $CONFIG_PATH$URL $URL

  link $CONFIG_PATH$URL $LN_PATH

  # If preprod, configure .htpasswd
  if [ ! -z $SUFFIX ]; then
    configureHtpasswd $PROJECT_NAME$SUFFIX $CONFIG_PATH$URL
  fi
}

# Create a copy of the server block template for the current project.
copyTemplate() {
  # PARAMETERS
  TEMPLATE_SERVERBLOCK_PATH=$1
  SERVERBLOCK_PATH=$2

  # BODY
  echo Creating Nginx server block at $SERVERBLOCK_PATH...
  cp $TEMPLATE_SERVERBLOCK_PATH $SERVERBLOCK_PATH
}

# Update the URL of a server block.
updateURL() {
  # PARAMETERS
  PROJECT_PATH=$1
  SERVERBLOCK_PATH=$2
  URL=$3

  # BODY
  echo Updating server block...
  sed -i "s|__PATH__|$PROJECT_PATH|g" $SERVERBLOCK_PATH
  sed -i "s|__URL__|$URL|g" $SERVERBLOCK_PATH
}

# Create a sym link in Nginx sites-enabled.
link() {
  # PARAMETERS
  SERVERBLOCK_PATH=$1
  LN_PATH=$2

  # BODY
  echo Creating symbolic link...
  ln -s $SERVERBLOCK_PATH $LN_PATH
}

# Creates a .htpasswd file for the current project.
configureHtpasswd() {
  # PARAMETERS
  PROJECT_NAME=$1
  SERVERBLOCK_PATH=$2

  # VARIABLES
  HTPASSWD_DIR=/etc/nginx/.passwd
  PROJECT_HTPASSWD_DIR=$HTPASSWD_DIR/$PROJECT_NAME

  HTPASSWD=$HTPASSWD_DIR/.htpasswd
  PROJECT_HTPASSWD=$PROJECT_HTPASSWD_DIR/.htpasswd

  # BODY
  # Create the folder to store the .htpasswd, create a new .htpasswd by copying the default one and update the server block to attach the new .htpasswd to it.
  mkdir $PROJECT_HTPASSWD_DIR
  cp $HTPASSWD $PROJECT_HTPASSWD_DIR
  sed -i "s|$HTPASSWD|$PROJECT_HTPASSWD|g" $SERVERBLOCK_PATH
}
