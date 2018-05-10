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
		route: '/route/',
		ssm_controller: '/ssm_controller/',
		html: '/html/'
	},
	ssm: {
		packegeName: 'com.culture.controller'
	},
	html: {
		is_jsp: false, //is generator file suffix to jsp
		login_register_resetpass_temp_id: 0, //0|1|2...   login and register and resetpass page generate template
		web_temp_id: 0 //0|1|2...   other page generate template
	}
};
