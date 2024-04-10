#!/bin/sh
#!/bin/bash

test() {
  STRING="Database information_schema mysql nomadkate_preprod performance_schema phpmyadmin sys wordpress wordpress_test wordpress_yankawordpress wordpress_yankawordpress_preprod"
  SEARCH=$1
  VAR=$(echo $STRING | grep "$SEARCH")

  if [ -z "${VAR}" ];
  then
    echo ""
  else
    echo "yay"
  fi
}

VAL=$(test wordpress_yankawordpress_preprodqdqzdz)
echo $VAL
if [ -z "${VAL}" ]
then
  echo -e "\033[31mFail...\033[0m"
else
  echo -e "\033[32mSuccess!\033[0m"
fi