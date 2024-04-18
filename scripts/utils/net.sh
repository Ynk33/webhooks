#!/bin/sh
#!/bin/bash

isFree() {
  # PARAMETERS
  PORT=$1

  nc -z localhost $PORT
  if [ "$?" -eq 1 ]
  then
    return $PORT
  else
    return 1
  fi
}

PORT=8100
isFree $PORT
while [ "$?" -eq 1 ] && [ $PORT -lt 8200 ] 
do
  PORT=$(($PORT + 1))
  isFree $PORT
done

echo $PORT