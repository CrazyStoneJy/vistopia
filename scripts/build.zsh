#! /bin/zsh 
set -e
rm -rf ./build/
rm -rf ./resources/
mkdir ./resources/
./node_modules/typescript/bin/tsc -p ./tsconfig.json
