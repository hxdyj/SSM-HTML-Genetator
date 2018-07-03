const path = require('path')
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName = path.resolve(__dirname, '../src') + '/js/get.var.js'
		file_utils.writeLineToFile(line, fileName, isReWrite, true)
	},
	writeToFiles(commonData) {
		//TODO:获取所有有登录功能表的信息，取出其中用户的【头像标识字段&姓名&密码】名称，头像如果没有标识，使用pic1中default_user_icon.jpg,姓名没有标识使用name，密码没有标识，使用pass
		this.writeToFile(
			`
var GetVar = {
	http:{
		server:'${config.http.server}',
		local:'${config.debug ? config.http.local || '' : config.http.server}'
	},
}
		`,
			true
		)
	}
}
