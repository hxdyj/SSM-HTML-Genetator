const path = require('path')
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName = path.resolve(__dirname, '../src') + '/js/get.var.js'
		file_utils.writeLineToFile(line, fileName, isReWrite, true)
	},
	writeToFiles(commonData) {
		//TODO:1.获取所有有登录功能表的信息，2.取出其中用户的【头像标识字段&姓名&密码】名称，头像如果没有标识，使用system_pic中default_user_icon.jpg,姓名没有标识使用【请设置姓名】，密码没有标识，使用【请设置密码】
		let login_tables = G.util.getHasSomeCommentTable(
			commonData,
			'func',
			'login'
		)

		let headerParams = ''
		_.forEach(login_tables, item => {
			headerParams += `
\t\t${item.tableComment._name}:{`

			headerParams +=
				`
			avatar:'${G.util.getTableHasSomeCommentFeild(item, 'avatar')[0] ||
				config.http.server + 'system_pic/default_user_icon.jpg'}'` + ','
			headerParams +=
				`
			pass:'${G.util.getTableHasSomeCommentFeild(item, 'pass')[0] || '请设置密码'}'` +
				','
			headerParams +=
				`
			name:'${G.util.getTableHasSomeCommentFeild(item, 'name')[0] || '请设置姓名'}'` +
				','
			headerParams += '\n\t\t},'
		})
		this.writeToFile(
			`
var GetVar = {
	http:{
		server:'${config.http.server}',
		local:'${config.debug ? config.http.local || '' : config.http.server}'
	},
	headerParams:{
		${headerParams}
	}
}
		`,
			true
		)
	}
}
