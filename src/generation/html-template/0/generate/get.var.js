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
			let avatar =
				G.util.getTableFeildEqualSomeVal(
					item,
					'header_func',
					'avatar'
				) || null
			let pass =
				G.util.getTableFeildEqualSomeVal(item, 'header_func', 'pass') ||
				null

			let name =
				G.util.getTableFeildEqualSomeVal(item, 'header_func', 'name') ||
				null

			headerParams +=
				`
			avatar:'${avatar}'` + ','
			headerParams +=
				`
			pass:'${pass}'` + ','
			headerParams +=
				`
			name:'${name}'` + ','
			headerParams += '\n\t\t},'
		})

		this.writeToFile(
			`
var GetVar = {
	http:{
		server:'${config.http.server}',
		local:'${config.debug ? config.http.local || '' : config.http.server}'
	},
	htmlConfig:{
		html_title:'${
			config.html.html_title ? config.html.html_title : 'Write By 月森'
		}',
		header:{
			title: '${
				config.html.header.title
					? config.html.header.title
					: config.html.html_title
						? config.html.html_title
						: 'Write By 月森'
			}',
			img: '${
				config.html.header.img
					? config.html.header.img
					: 'header_logo_img.png'
			}',
			userImg:'${
				config.html.header.userImg
					? config.html.header.userImg
					: 'user_default_avatar.png'
			}'
		},
		leftMenu:{
			content: "${
				config.html.leftMenu.content
					? config.html.leftMenu.content
					: "梦想开始的地方<br>Let's Go..."
			}",
			img: '${
				config.html.leftMenu.img
					? config.html.leftMenu.img
					: 'left_menu_default_img.png'
			}'
		}
	},
	headerParams:{
		${headerParams}
	},
	file_suffix:'${config.html.file_suffix}'
}
		`,
			true
		)
	}
}
