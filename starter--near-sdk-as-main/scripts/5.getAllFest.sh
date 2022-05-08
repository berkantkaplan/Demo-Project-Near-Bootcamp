#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo 
echo  
echo 'About to call findFests() on the contract'
echo "--------------------------"
echo "this call shows a maximum of 15 festivals"
echo
echo near view \$CONTRACT findFests '{"offset": 0}'
echo "-----------------------------"
echo
near view $CONTRACT findFests '{"offset": 0}'
echo 
echo "--------------------------"
echo
echo


