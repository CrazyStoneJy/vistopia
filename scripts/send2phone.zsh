#! /bin/zsh 
set -e

# todo omit blank, sepecial character

# check adb
adb devices

cd resources

for file in ./*.mp3
do
    if [[ -e $file ]]; 
    then
        echo "$file" 
        adb push $file $1
    fi
done

echo 'send all episodes successfully.'