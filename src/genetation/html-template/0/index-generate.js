module.exports = () => {
	console.log(clc.blue('start genetating web html template....'));
};
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.html + 'index.' + config.html.file_suffix;
		debugger;
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(tablesDesc) {
		let a = file_utils.readFile(__dirname + '/src/index.html', 'utf-8');
		this.writeToFile(`hahaha`, true);
	}
};
