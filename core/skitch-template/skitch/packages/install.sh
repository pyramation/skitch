#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

echo cd $DIR
cd $DIR
for x in $(ls -d */)
do
 cd $x
 make install
 cd ../
done
