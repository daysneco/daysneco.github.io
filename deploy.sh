#!/bin/sh
function init(){
    mkdir hexo
    git clone -b hexo_source https://github.com/daysneco/daysneco.github.io.git hexo
    hexo install

    mkdir wiki
    git clone https://github.com/daysneco/wiki.git wiki
    cd wiki
    mkdir output
    git clone -b gh-pages https://github.com/daysneco/wiki.git output
    cd ../..
}
function update(){
    cd hexo
    git pull origin hexo_source
    cd ../wiki
    git pull origin master
    cd output
    git pull origin gh-pages
    cd ../..
}
function deploy(){
    cd hexo
    hexo clean
    hexo g
    hexo deploy
    git add . --all
    git commit -am "update"
    git pull origin hexo_source
    git push origin hexo_source

    cd ../wiki
    git add ./ --all
    git commint -am "update"
    git pull origin master
    git push origin master

    simiki g
    cd output
    git add . --all
    git commit -am "update"
    git pull origin gh-pages
    git push origin gh-pages
    cd ../..
}
if [ "$1" = "-i" ]; then
    echo "init"
    init
elif [ "$1" = "-u" ]; then
    echo "update"
    update
elif [ "$1" = "-d" ]; then
    echo "deploy"
    deploy
fi
