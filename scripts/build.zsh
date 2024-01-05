#! /bin/zsh 
set -e
echo 'start build 🔥'
rm -rf ./dist/

# compile typescript code
./node_modules/typescript/bin/tsc -p ./tsconfig.json
echo 'build suceessfully! 👌🏻'