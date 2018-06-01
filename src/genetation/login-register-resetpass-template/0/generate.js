module.exports = commonData => {
	console.log(
		clc.blue('start genetating login-register-resetpass html template....')
	)
	//生成login页面
	require('./generate/login').writeToFiles(commonData)
	//生成register页面
	require('./generate/register').writeToFiles(commonData)
}
