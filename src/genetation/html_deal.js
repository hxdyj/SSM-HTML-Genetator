module.exports = {
	login_register_resetpass: () => {
		require(`./login-register-resetpass-template/${
			config.html.login_register_resetpass_temp_id
		}/genetate.js`)();
	},
	template: () => {
		require(`./html-template/${config.html.web_temp_id}/genetate.js`)();
	}
};
