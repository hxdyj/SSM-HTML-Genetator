module.exports = {
	login_register_resetpass: commonData => {
		//生成login和register页面以及重置密码页面
		console.log(clc.blue('deal login html template.'))
		require(`./login-register-resetpass-template/${
			config.html.login_register_resetpass_temp_id
		}/generate.js`)(commonData)
	},
	template: commonData => {
		//生成通用管理页面
		console.log(clc.blue('deal web html template.'))
		require(`./html-template/${config.html.web_temp_id}/generate.js`)(
			commonData
		)
	}
}
