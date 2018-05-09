const fs = require('fs');

module.exports = {
	init() {
		let path = config.basePath + config.outputDir;
		let isExist = fs.existsSync(path);

		console.log(clc.blue('output dir is exist:', isExist));
		if (!isExist) {
			fs.mkdirSync(path);
			fs.mkdirSync(path + '/route/');
		}
	},
	/**
	 * @description
	 * 清空文件夹
	 * @author 宋乐
	 * @param {any} dir
	 */
	cleanOutputDir(dir) {
		let files = fs.readdirSync(dir);
		_.forEach(files, file => {
			let path = dir + '/' + file;
			var stats = fs.statSync(path);
			if (stats.isDirectory()) {
				this.cleanOutputDir(path);
			} else {
				fs.unlinkSync(path);
				console.log(clc.red('delete file:'), path);
			}
		});
	},

	/* @description
	* 向文件中追加一行或者清空重新开始写入一行
	* @author 宋乐
	* @param {any} line 这行的文字
	* @param {any} pathFileName
	* @param {any} isReWrite  是否清空文件开始写
	*/
	writeLineToFile(line, pathFileName, isReWrite) {
		if (isReWrite)
			fs.writeFileSync(
				config.basePath + config.outputDir + pathFileName,
				line + '\n'
			);
		else
			fs.appendFileSync(
				config.basePath + config.outputDir + pathFileName,
				line + '\n'
			);
	}
};
