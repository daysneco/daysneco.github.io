#!/bin/sh
function init(){
    mkdir hexo
    git clone -b hexo_source https://github.com/daysneco/daysneco.github.io.git hexo
    hexo install

    mkdir wiki
    git clone -b wiki_source https://github.com/daysneco/daysneco.github.io.git wiki
    cd wiki
    mkdir output
    git clone -b gh-pages https://github.com/daysneco/daysneco.github.io.git output
    cd ../..
}
function update(){
    cd hexo
    git pull origin hexo_source
    cd ../wiki
    git pull origin wiki_source
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
    git pull origin wiki_source
    git push origin wiki_source

    simiki g
    cd output
    git add . --all
    git commit -am "update"
    git pull origin gh-pages
    git push origin gh-pages
    cd ../..
}
if [ "$1" = "init" ]; then
    echo "init"
    init
elif [ "$1" = "update" ]; then
    echo "update"
    update
elif [ "$1" = "deploy" ]; then
    echo "deploy"
    deploy
fi
