#! /bin/zsh 
set -e
echo 'start build 🔥'
rm -rf ./build/
rm -rf ./resources/
mkdir ./resources/
./node_modules/typescript/bin/tsc -p ./tsconfig.json
echo 'build suceessfully! 👌🏻'