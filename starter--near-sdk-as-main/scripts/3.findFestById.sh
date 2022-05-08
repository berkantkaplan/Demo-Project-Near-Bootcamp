

#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo 'About to call findFestById() on the contract'
echo "--------------------------------------------"
echo "--------------------------------------------"
echo near call \$CONTRACT findFestById '{"id":"$1"}' --accountId \$OWNER 
echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$1 is [ $1 ] '(id )'
echo \$2 is [ $2 ] '(claim amount)'
echo
echo "--------------------------------------------"
near view $CONTRACT findFestById '{"id":'"$1"'}' --accountId $OWNER
echo
echo