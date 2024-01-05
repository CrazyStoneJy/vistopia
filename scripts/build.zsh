#! /bin/zsh 
set -e
echo 'start build 🔥'
rm -rf ./dist/

# compile typescript code
tsc -p ./tsconfig.json
echo 'build suceessfully! 👌🏻'