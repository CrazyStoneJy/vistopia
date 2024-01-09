set -e
echo 'start build chrome extension 🔥'

# echo 'delete chrome/dist/'
rm -rf ./chrome/dist/
# echo 'delete chrome/dist/ successfully.'
mkdir ./chrome/dist/

# compile typescript code
# precompile api
# tsc ./src/api.ts ./src/arrays.ts ./src/fs.ts ./src/logs.ts ./src/net.ts --module system --outfile index.js
./node_modules/.bin/babel --out-file bundle.js ./src/api.ts ./src/arrays.ts ./src/fs.ts ./src/logs.ts ./src/net.ts
# mv ./src/api.js ./src/arrays.js ./src/fs.js ./src/logs.js ./src/net.js ./chrome/dist/
# echo 'compile api successfully.'

# # compile chrome extension
# tsc ./chrome/src/index.ts
# mv ./chrome/src/index.js ./chrome/dist/
# tsc

echo 'build chrome extension suceessfully! 👌🏻'