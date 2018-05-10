module.exports = {
	writeToFile(tableName, line, isReWrite) {
		let fileName =
			config.generateDirs.ssm_controller + tableName + 'Controller.java';
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(tablesDesc) {
		_.forEach(tablesDesc, (val, index) => {
			this.writeToFile(index, `const entity")`, true);
		});
	}
};
