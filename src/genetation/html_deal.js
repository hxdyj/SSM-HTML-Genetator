module.exports = {
	login_register_resetpass: commonData => {
		console.log(clc.blue('deal login html template.'));
		require(`./login-register-resetpass-template/${
			config.html.login_register_resetpass_temp_id
			}/generate.js`)(commonData);
	},
	template: commonData => {
		console.log(clc.blue('deal web html template.'));
		require(`./html-template/${config.html.web_temp_id}/generate.js`)(
			commonData
		);
	}
};
