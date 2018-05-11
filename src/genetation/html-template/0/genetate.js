module.exports = tablesDesc => {
	console.log(clc.blue('start genetating web html template....'));
	require('./index-generate').writeToFiles(tablesDesc);
};
