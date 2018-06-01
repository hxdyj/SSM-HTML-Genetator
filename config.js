module.exports = {
	connect: {
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'tbgooglemap'
	},
	basePath: __dirname,
	serviceRequireBasePath: '../entity/',
	outputDir: '/generate-output',
	generateDirs: {
		ssm_controller: '/ssm_controller/',
		html: '/html/'
	},
	ssm: {
		packegeName: 'com.cultral.controller'
	},
	html: {
		html_title: 'XX系统',
		file_suffix: 'html', //jsp|html
		login_register_resetpass_temp_id: 0, //0|1|2...   login and register and resetpass page generate template
		is_verify_login: ['user'], //user|admin 图片验证码登录
		verify_login_count: 3, //输入密码次数后验证,Note: this param valid only while is_verify_login is true
		web_temp_id: 0 //0|1|2...   other page generate template
	}
};
