module.exports = () => {
	console.log(clc.blue('start genetating web html template....'));
};
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.html + 'index.' + config.html.file_suffix;
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(commonData) {
		this.writeToFile(`hahaha`, true);
	}
};
