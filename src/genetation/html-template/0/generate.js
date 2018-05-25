
function copyDirToOutPutPath(dirs) {
	_.forEach(dirs, item => {
		shell.cp('-R', __dirname + '/src/' + item, config.basePath + config.outputDir + '/html/')
	})
}
module.exports = commonData => {
	console.log(clc.blue('start genetating web html template....'));
	require('./generate/index').writeToFiles(commonData);
	copyDirToOutPutPath(['components', 'css', 'img', 'js'])
};
