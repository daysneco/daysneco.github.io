if "%1"=="-i"  goto init
if "%1"=="-u" goto update
if "%1"=="-d" goto deploy
goto deploy

:init
md hexo
git clone -b hexo_source https://github.com/daysneco/daysneco.github.io.git hexo
md wiki
git clone https://github.com/daysneco/wiki.git wiki
cd wiki
md output
git clone -b gh-pages git@github.com:daysneco/wiki.git output
cd ../hexo
npm install -g hexo-cli
cd ..
goto end

:update
cd hexo
git pull origin hexo_source
cd ../wiki
git pull origin master
cd output
git pull origin gh-pages
cd ../..
goto end

:deploy
cd wiki
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

cd hexo
hexo clean
hexo g
hexo deploy
git add . --all
git commit -am "update"
git pull origin hexo_source
git push origin hexo_source
cd ..
goto end

:end