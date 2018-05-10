global.clc = require('cli-color');
global._ = require('lodash'); //lodash引入
global.config = require('./config'); //配置文件
global.file_utils = require('./src/util/file_utils'); //文件相关操作
const mysql_utils = require('./src/util/mysql_utils'); //数据库相关操作
console.log(clc.green('start running...'));
function generating() {
	mysql_utils.conn().then(async mysql => {
		file_utils.init(); //初始化
		file_utils.cleanOutputDir(config.basePath + config.outputDir); //清理输出目录
		//执行生成route文件
		let tablesDesc = await mysql_utils.getTablesDesc(mysql);
		require('./src/genetation/routes').writeToFiles(tablesDesc);
		require('./src/genetation/ssm_controller').writeToFiles(tablesDesc);
		let HtmlGenerate = require('./src/genetation/html_deal');
		HtmlGenerate.login_register_resetpass();
		HtmlGenerate.template();
		mysql.end();
		console.log(clc.green('end mysql.'));
	});
}

generating();
