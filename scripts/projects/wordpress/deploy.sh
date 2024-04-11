#!/bin/sh
#!/bin/bash

# Display Help
Help() {
  echo "Deployment script for YankaDevLab."
  echo
  echo "Syntax: deploy <project-name> [--help] [--preprod]"
  echo "arguments:"
  echo -e "\t<project-name>\tName of the project to deploy"
  echo "options:"
  echo -e "\t--help\tPrint this Help."
  echo -e "\t--preprod\tDeploy in preprod."
  echo
}

# Variables
source .env
PROJECT_NAME=$1
SUFFIX=""
OPTION_PREPROD=""
OPTION_DB=""

# Check if project-name is given
if [[ -z $PROJECT_NAME ]] || [[ $PROJECT_NAME == -* ]];
then
  if [ ! $PROJECT_NAME == --help ];
  then
    echo "Error: project-name is empty"
  fi
  echo
  Help
  exit 1
fi

# Apply the options
shift
for i in $@
do
  case $i in
    --help)
      Help
      exit
      ;;
    --preprod)
      SUFFIX="-preprod"
      OPTION_PREPROD=" --preprod"
      ;;
    --db)
      OPTION_DB=" --db"
      ;;
    *)
      echo "Error: Invalid option $i"
      Help
      exit
      ;;
  esac
done

# Check if it is the first deploy or an update
if [ -d "$ROOT_PATH/$PROJECT_NAME$SUFFIX.$DOMAIN" ]; then
  # Launch update-project.sh
  echo "Updating project $PROJECT_NAME$SUFFIX.$DOMAIN..."
  echo
  bash ./scripts/projects/wordpress/update-project.sh $PROJECT_NAME $OPTION_PREPROD $OPTION_DB
else
  # Launch create-project.sh
  echo "Creating project $PROJECT_NAME$SUFFIX.$DOMAIN..."
  echo
  bash ./scripts/projects/wordpress/create-project.sh $PROJECT_NAME $OPTION_PREPROD
fi
