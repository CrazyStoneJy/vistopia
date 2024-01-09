set -e
echo 'start build chrome extension 🔥'

# echo 'delete chrome/dist/'
rm -rf ./chrome/dist/
# echo 'delete chrome/dist/ successfully.'
mkdir ./chrome/dist/

# compile typescript code
tsc -p ./tsconfig.json
# babel ./src/api.ts ./src/arrays.ts ./src/fs.ts ./src/logs.ts ./src/net.ts chrome/src/index.ts --out-file ./dist/bundle.js


echo 'build chrome extension suceessfully! 👌🏻'