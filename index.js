global.clc = require('cli-color')
global._ = require('lodash') //lodash引入
global.G = {
	util: require('./src/util/common_util') //通用的工具包
}
global.shell = require('shelljs')
global.execSh = require('exec-sh')
global.config = require('./config') //配置文件
global.file_utils = require('./src/util/file_utils') //文件相关操作
const mysql_utils = require('./src/util/mysql_utils') //数据库相关操作
console.log(clc.green('start running...'))
function generating() {
	mysql_utils.conn().then(async mysql => {
		file_utils.init() //初始化
		file_utils.cleanOutputDir(config.basePath + config.outputDir) //清理输出目录
		//获取所有表及其详细信息
		let commonData = await mysql_utils.getTablesDesc(mysql)
		//生成ssm controller 文件
		require('./src/genetation/ssm_controller').writeToFiles(commonData)

		//生成前端模板
		let HtmlGenerate = require('./src/genetation/html_deal')
		HtmlGenerate.login_register_resetpass(commonData)
		HtmlGenerate.template(commonData)
		mysql.end()
		console.log(clc.green('end mysql.'))
	})
}

generating()
