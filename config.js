module.exports = {
	connect: {
		host: 'wingblog.top',
		user: 'history',
		password: '123456',
		database: 'history'
	},
	basePath: __dirname,
	serviceRequireBasePath: '../entity/',
	outputDir: '/generate-output',
	generateDirs: {
		ssm_controller: '/ssm_controller/',
		html: '/html/'
	},
	ssm: {
		packegeName: 'com.culture.controller'
	},
	html: {
		is_jsp: false, //is generator file suffix to jsp
		login_register_resetpass_temp_id: 0, //0|1|2...   login and register and resetpass page generate template
		is_verify_login: false, //是否在多次输入密码错误后出现图片验证码
		verify_login_count: 3, //输入密码次数后验证,Note: this param valid only while is_verify_login is true
		web_temp_id: 0 //0|1|2...   other page generate template
	}
};
