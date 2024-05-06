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
su - yanka -c "cd $PROJECT_PATH && git pull --recurse-submodules && git submodule update --remote --merge"

## The end
echo -e "\033[32mDeployment complete!\033[0m"
