const path = require('path')
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName = path.resolve(__dirname, '../src') + '/json/menu.json'
		file_utils.writeLineToFile(line, fileName, isReWrite, true)
	},
	writeToFiles(commonData) {
		let list_leftMenu = JSON.stringify(
			_.map(commonData.tablesDesc, (val, key) => {
				let obj = {}
				obj.icon = 'user'
				obj.name = val.tableComment.cn_name || key
				obj.href = key.toLowerCase() + '.' + config.html.file_suffix
				return obj
			})
		)

		this.writeToFile(
			`
		${list_leftMenu}
		`,
			true
		)
	}
}
