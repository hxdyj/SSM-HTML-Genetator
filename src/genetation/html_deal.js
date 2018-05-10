module.exports = {
	login_register_resetpass: () => {
		console.log(clc.blue('deal login html template.'));
		require(`./login-register-resetpass-template/${
			config.html.login_register_resetpass_temp_id
		}/genetate.js`)();
	},
	template: () => {
		console.log(clc.blue('deal web html template.'));
		require(`./html-template/${config.html.web_temp_id}/genetate.js`)();
	}
};
