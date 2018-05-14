module.exports = commonData => {
	console.log(clc.blue('start genetating web html template....'));
	require('./generate/index').writeToFiles(commonData);
};
