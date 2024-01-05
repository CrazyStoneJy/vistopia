#! /bin/zsh 
set -e

# todo omit blank, sepecial character

# check adb
adb devices

cd $1

for file in ./*.mp3
do
    if [[ -e $file ]]; 
    then
        echo "$file" 
        adb push $file $2
    fi
done

echo 'send all episodes successfully.'