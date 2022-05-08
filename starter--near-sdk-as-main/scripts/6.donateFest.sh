#!/usr/bin/env bash
set -e


[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo 'About to call donateFest() on the contract'
echo "---------------------------------------------"
echo
echo near call $CONTRACT donateFest '{"id":"$id", "donation" : "$donation"}'  --accountId \$OWNER --amount \$1
echo
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo
echo \$donation is [$1 NEAR]
echo \$id is [ $2 ] 
echo
echo
near call $CONTRACT donateFest '{"id":'"$2"', "donation" : '"$1"'}'  --accountId $OWNER --amount $1
echo
echo
