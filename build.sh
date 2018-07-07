# 清理输出目录
rm -rf dist
# Webpack打包
webpack --progress
# 将配置文件及package.json拷贝到输出目录
cp config.js dist
cp package.json dist
# 递归新建目录
mkdir -p dist/src/generation/html-template/0
# 拷贝html模板到输出目录
cp -r src/generation/html-template/0/src dist/src/generation/html-template/0
# 清理不必要的文件
rm -rf dist/src/generation/html-template/0/src/gulpfile.js
rm -rf dist/src/generation/html-template/0/src/index.html
rm -rf dist/src/generation/html-template/0/src/scss
