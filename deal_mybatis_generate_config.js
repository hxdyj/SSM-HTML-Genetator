const execSh = require('exec-sh')
const config = require('./config')
execSh("rm -rf javaweb-project/mybatic_generate/generatorConfig.xml")
execSh(`mv .${config.outputDir}/${config.generateDirs.mybatis_generate}/generatorConfig.xml javaweb-project/mybatic_generate`)