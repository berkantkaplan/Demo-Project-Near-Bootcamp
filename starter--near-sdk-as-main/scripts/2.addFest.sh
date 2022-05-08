#!/usr/bin/env bash
set -e

echo
echo 'About to call addFfest() on the contract to create a project'
echo
echo \$CONTRACT is $CONTRACT
echo
echo
near call $CONTRACT addFest '{"festName":"'"$1"'","genre":"'"$2"'","country":"'"$3"'","date":"'"$4"'","requestDonation":"'"$5"'"}' --accountId $OWNER
echo
echo