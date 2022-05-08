#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo 
echo  
echo 'About to call viewFestByName() on the contract'
echo "--------------------------"
echo "This call shows Festival by Name"
echo
echo near view \$CONTRACT findFestByName '{"festName":"$1"}'
echo "-----------------------------"
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$1 is [ $festName ] '(festival name )'
echo
near view $CONTRACT findFestByName '{"festName":"'"$1"'"}'
echo 
echo "--------------------------"
echo
echo
