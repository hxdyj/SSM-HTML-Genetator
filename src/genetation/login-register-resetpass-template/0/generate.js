module.exports = (commonData) => {
	console.log(
		clc.blue('start genetating login-register-resetpass html template....')
	);
	require('./generate/login').writeToFiles(commonData)
};
