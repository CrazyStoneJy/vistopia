set -e
echo 'start chrome build 🔥'
rm -rf ./chrome/dist/

# compile typescript code
# tsc -p ./tsconfig.json
echo $PWD
tsc ./src/api.ts ./src/arrays.ts ./src/fs.ts ./src/logs.ts ./src/net.ts --module commonjs --outDir ./chrome/dist/
tsc ./chrome/src/index.ts --module commonjs --outDir ./dist

echo 'build chrome extensions suceessfully! 👌🏻'