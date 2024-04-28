#!/bin/sh
#!/bin/bash

## Sourcing
source .env
###
# Sets:
# - CONFIG_PATH
# - LN_PATH
# - HTPASSWD_PATH
###

configureServerBlockWordpress() {
  # PARAMETERS
  PROJECT_NAME=$1
  PROJECT_PATH=$2
  URL=$3
  SUFFIX=$4

  ## BODY
  # Create server block
  copyTemplate $CONFIG_PATH"template-wordpress"$SUFFIX $CONFIG_PATH$URL

  # Update server block
  echo Updating server block...
  updateServerBlock $CONFIG_PATH$URL __PATH__ $PROJECT_PATH
  updateServerBlock $CONFIG_PATH$URL __URL__ $URL

  link $CONFIG_PATH$URL $LN_PATH

  # If preprod, configure .htpasswd
  if [ ! -z $SUFFIX ]; then
    configureHtpasswd $PROJECT_NAME$SUFFIX $CONFIG_PATH$URL
  fi
}

configureServerBlockNext() {
  # PARAMETERS
  PROJECT_NAME=$1
  URL=$2
  PORT=$3
  SUFFIX=$4

  echo "##### server-block.sh: $SUFFIX"

  ## BODY
  # Create server block
  copyTemplate $CONFIG_PATH"template-next"$SUFFIX $CONFIG_PATH$URL

  # Update server block
  echo Updating server block...
  updateServerBlock $CONFIG_PATH$URL __URL__ $URL
  updateServerBlock $CONFIG_PATH$URL __PORT__ $PORT

  link $CONFIG_PATH$URL $LN_PATH

  # If preprod, configure .htpasswd
  if [ ! -z "${SUFFIX}" ]; then
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

# Update the Project path of a server block.
updateServerBlock() {
  # PARAMETERS
  SERVERBLOCK_PATH=$1
  PATTERN=$2
  VALUE=$3

  # BODY
  sed -i "s|$PATTERN|$VALUE|g" $SERVERBLOCK_PATH
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
  PROJECT_HTPASSWD_DIR=$HTPASSWD_PATH/$PROJECT_NAME

  HTPASSWD=$HTPASSWD_PATH/.htpasswd
  PROJECT_HTPASSWD=$PROJECT_HTPASSWD_DIR/.htpasswd

  # BODY
  # Create the folder to store the .htpasswd, create a new .htpasswd by copying the default one and update the server block to attach the new .htpasswd to it.
  mkdir $PROJECT_HTPASSWD_DIR
  cp $HTPASSWD $PROJECT_HTPASSWD_DIR
  sed -i "s|$HTPASSWD|$PROJECT_HTPASSWD|g" $SERVERBLOCK_PATH
}
