module.exports = {
	connect: {
		host: 'wingblog.top',
		user: 'history',
		password: '123456',
		database: 'history'
	},
	basePath: __dirname,
	serviceRequireBasePath: '../entity/',
	outputDir: '/generate-output/',
	ssm: {
		packegeName: 'com.culture.controller'
	},
	html: {}
};
