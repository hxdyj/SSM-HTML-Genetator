const execSh = require('exec-sh')
const config = require('./config')
execSh('cd ../../')
//# 删除controller
execSh('rm -rf javaweb-project/project/System/src/com/system/controller')
execSh('mkdir -p javaweb-project/project/System/src/com/system/controller')
execSh(
	`cp .${
	config.outputDir
	}/ssm_controller/* javaweb-project/project/System/src/com/system/controller`
)
execSh('rm -rf javaweb-project/project/System/WebRoot/components')
execSh('rm -rf javaweb-project/project/System/WebRoot/css')
execSh('rm -rf javaweb-project/project/System/WebRoot/img')
execSh('rm -rf javaweb-project/project/System/WebRoot/js')
execSh('rm -rf javaweb-project/project/System/WebRoot/json')
execSh('rm -rf javaweb-project/project/System/WebRoot/pages')
execSh(
	`cp -Rf .${config.outputDir}/html/* javaweb-project/project/System/WebRoot`
)
execSh('rm -rf db.sql')
execSh(
	`mysqldump -h ${config.connect.host} -P ${config.connect.port} -u ${
	config.connect.user
	} -p${config.connect.password} ${config.connect.database} > db.sql`
)
execSh(
	'rm -rf javaweb-project/project/System/src/ApplicationContext-spring.xml'
)
execSh(
	`mv .${config.outputDir}/${
	config.generateDirs.mybatis_generate
	}/ApplicationContext-spring.xml javaweb-project/project/System/src`
)
execSh('mv db.sql javaweb-project/project/System')
//execSh(`rm -rf ./${config.outputDir}`)

console.log('Generate Project Done.')
