function copyDirToOutPutPath(dirs) {
	//将component和scss编译后的css以及js等拷贝到输出目录
	_.forEach(dirs, item => {
		shell.cp(
			'-R',
			__dirname + '/src/' + item,
			config.basePath + config.outputDir + '/html/'
		)
	})
}
module.exports = commonData => {
	console.log(clc.blue('start genetating web html template....'))
	require('./generate/index').writeToFiles(commonData)
	require('./generate/module').writeToFiles(commonData)
	require('./generate/menu.json').writeToFiles(commonData)
	copyDirToOutPutPath(['components', 'css', 'img', 'js', 'json'])
}
