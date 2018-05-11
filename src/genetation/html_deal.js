module.exports = {
	login_register_resetpass: tablesDesc => {
		console.log(clc.blue('deal login html template.'));
		require(`./login-register-resetpass-template/${
			config.html.login_register_resetpass_temp_id
		}/genetate.js`)();
	},
	template: tablesDesc => {
		console.log(clc.blue('deal web html template.'));
		require(`./html-template/${config.html.web_temp_id}/genetate.js`)(
			tablesDesc
		);
	}
};
