module.exports = {
	debug: true,
	connect: {
		host: 'wingblog.top',
		user: 'tbarchives',
		password: 'tbarchives',
		database: 'tbarchives'
	},
	basePath: __dirname,
	serviceRequireBasePath: '../entity/',
	outputDir: '/generate-output',
	http: {
		server: 'http://localhost:8080/System/',
		local: 'http://localhost:3000/'
	},
	generateDirs: {
		ssm_controller: '/ssm_controller/',
		html: '/html/',
		html_pages: '/html/pages/'
	},
	ssm: {
		packegeName: 'com.system'
	},
	html: {
		html_title: '人才市场档案管理系统',
		file_suffix: 'html', //jsp|html
		login_register_resetpass_temp_id: 0, //0|1|2...   login and register and resetpass page generate template
		web_temp_id: 0 //0|1|2...   other page generate template
	}
}
