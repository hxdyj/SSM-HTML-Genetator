const execSh = require('exec-sh')
const config = require('./config')
//# 删除controller
execSh('rm -rf javaweb-project/project/System/src/com/system/controller')
execSh('mkdir -p javaweb-project/project/System/src/com/system/controller')
execSh('echo "test"')
execSh(
	`cp .${
		config.outputDir
	}/ssm_controller/* javaweb-project/project/System/src/com/system/controller`
)
execSh(
	`cp -Rf .${config.outputDir}/html/* javaweb-project/project/System/WebRoot`
)
