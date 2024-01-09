set -e
echo 'start build chrome extension 🔥'

# echo 'delete chrome/dist/'
rm -rf ./chrome/dist/
# echo 'delete chrome/dist/ successfully.'
mkdir ./chrome/dist/

# compile typescript code
babel ./src/api.ts ./src/arrays.ts ./src/fs.ts ./src/logs.ts ./src/net.ts --out-file ./chrome/dist/bundle.cjs


echo 'build chrome extension suceessfully! 👌🏻'