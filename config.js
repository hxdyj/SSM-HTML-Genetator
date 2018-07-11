const path = require('path')
module.exports = {
	debug: false, //是否为开发环境
	connect: {
		host: 'wingblog.top',
		port: 3306,
		user: 'tbsimplebook',
		password: 'tbsimplebook',
		database: 'tbsimplebook'
	},
	basePath: path.resolve(__dirname),
	serviceRequireBasePath: '../entity/',
	//这里不要修改
	outputDir: '/generate-output',
	//接口地址
	http: {
		server: 'http://localhost:8080/System/',
		local: 'http://localhost:3000/'
	},
	//这里的都不要修改
	generateDirs: {
		ssm_controller: '/ssm_controller/',
		mybatis_generate: '/mybatis_generate/',
		html: '/html/',
		html_pages: '/html/pages/'
	},
	ssm: {
		//包名
		packegeName: 'com.system'
	},
	html: {
		//网页标题
		html_title: '',
		header: {
			title: '',
			img: '', //Menu左侧图标
			userImg: '' //用户没有头像时的默认图标
		},
		leftMenu: {
			content: '', //support html
			img: '' //support html
		},
		file_suffix: 'jsp', //jsp|html
		login_register_resetpass_temp_id: 0, //0|1|2...   login and register and resetpass page generate template
		web_temp_id: 0 //0|1|2...   other page generate template
	}
}
