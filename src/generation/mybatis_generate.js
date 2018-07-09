module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.mybatis_generate + 'generatorConfig.xml'
		file_utils.writeLineToFile(line, fileName, isReWrite)
	},
	writeToFiles(commonData) {
		let tables = _.join(
			_.map(
				commonData.tablesDesc,
				item => `
			<table tableName="${item.tableComment._name}" ></table>`
			),
			''
		)
		this.writeToFile(
			`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
	PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
	"http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
	<context id="testTables" targetRuntime="MyBatis3">
		<commentGenerator>
			<!-- 是否去除自动生成的注释 true：是 ： false:否 -->
			<property name="suppressAllComments" value="true" />
		</commentGenerator>
		<!--数据库连接的信息：驱动类、连接地址、用户名、密码 -->
		<jdbcConnection driverClass="com.mysql.jdbc.Driver"
			connectionURL="jdbc:mysql://${config.connect.host}:${config.connect.port}/${
				config.connect.database
			}" userId="${config.connect.user}"
			password="${config.connect.password}">
		</jdbcConnection>
		<!-- <jdbcConnection driverClass="oracle.jdbc.OracleDriver" connectionURL="jdbc:oracle:thin:@127.0.0.1:1521:yycg"
			userId="yycg" password="yycg"> </jdbcConnection> -->

		<!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，为 true时把JDBC DECIMAL
			和 NUMERIC 类型解析为java.math.BigDecimal -->
		<javaTypeResolver>
			<property name="forceBigDecimals" value="false" />
		</javaTypeResolver>

		<!-- targetProject:生成PO类的位置 -->
		<javaModelGenerator targetPackage="${config.ssm.packegeName}.model"
			targetProject="./">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
			<!-- 从数据库返回的值被清理前后的空格 -->
			<property name="trimStrings" value="true" />
		</javaModelGenerator>
		<!-- targetProject:mapper映射文件生成的位置 -->
		<sqlMapGenerator targetPackage="${config.ssm.packegeName}.mapper"
			targetProject="./">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
		</sqlMapGenerator>
		<!-- targetPackage：mapper接口生成的位置 -->
		<javaClientGenerator type="XMLMAPPER"
			targetPackage="${config.ssm.packegeName}.mapper" targetProject="./">
			<!-- enableSubPackages:是否让schema作为包的后缀 -->
			<property name="enableSubPackages" value="false" />
		</javaClientGenerator>
			${tables}
			<!-- <table tableName="proback" >
			<columnOverride column="detail" jdbcType="VARCHAR" />
			</table> -->

	</context>
</generatorConfiguration>
		`,
			true
		)
	}
}
