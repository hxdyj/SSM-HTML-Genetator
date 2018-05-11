let mysql = require('mysql-promise')();
module.exports = {
	conn() {
		mysql.configure(config.connect);
		return mysql
			.getConnection()
			.then(() => {
				console.log(clc.green('connect mysql success.'));
				return mysql;
			})
			.catch(err => {
				console.log(clc.red('connect mysql err'), err);
			});
	},
	/**
	 * @description
	 * 获取数据库所有表
	 * @author 宋乐
	 * @param {any} connect
	 * @returns connect:mysql -> Promise
	 */
	getAllTablesOfDatabase(connect) {
		return connect.query('show tables');
	},
	async getTablesDesc(connect) {
		let tables = await this.getAllTablesOfDatabase(connect);
		let tablesDesc = {};
		let G_Table_Map = new Map();
		let G_Feild_Map = new Map();
		for (let item of tables[0]) {
			let tableName = item[tables[1][0].name];
			let desc = await connect.query(
				`select * from information_schema.columns where table_name='${tableName}'`
			); //获取表的结构
			let className = this.getClassNameOfTableName(tableName);
			tablesDesc[className] = desc[0];
			tablesDesc[className].fields = _.map(
				desc[0],
				item => item.COLUMN_NAME
			);

			let commentMap = new Map();
			_.forEach(desc[0], item => {
				if (!item.COLUMN_COMMENT) item.COLUMN_COMMENT = '{}';
				let commentObj = JSON.parse(item.COLUMN_COMMENT);
				//use it while field java_type exit,otherwise read mysql type and transform to java type
				if (!commentObj.java_type) {
					// TODO:date type  --> remain to back
					switch (item.DATA_TYPE) {
						case 'int':
							commentObj.java_type = 'Integer';
							break;
						case 'varchar':
							commentObj.java_type = 'String';
							break;
						case 'text':
							commentObj.java_type = 'String';
							break;
						default:
							commentObj.java_type = 'String';
							break;
					}
				}
				if (!commentObj.not_in_param) {
					commentObj.not_in_param = [];
				}
				commentMap.set(item.COLUMN_NAME, commentObj);
			});

			tablesDesc[className].commentMap = commentMap;
			//获取表的注释
			let tableCommentStr = (await connect.query(
				`SELECT table_comment FROM INFORMATION_SCHEMA.TABLES WHERE table_schema='${
					config.connect.database
				}' AND table_name='${tableName}'`
			))[0][0].table_comment;
			if (!tableCommentStr) tableCommentStr = '{}';
			tablesDesc[className].tableComment = JSON.parse(tableCommentStr);

			if (tablesDesc[className].tableComment.global_table) {
				G_Table_Map.set(
					tablesDesc[className].tableComment.global_table,
					className
				);
			}
		}
		tablesDesc['_Global_'] = {
			field: G_Feild_Map,
			table: G_Table_Map
		};
		return tablesDesc;
	},
	/**
	 * @description
	 * 通过数据库表名获取 js Class类名
	 * @author 宋乐
	 * @param {any} tableName
	 * @returns  student -> Student
	 */
	getClassNameOfTableName(tableName) {
		return (
			tableName.substring(0, 1).toUpperCase() +
			tableName.substring(1, tableName.length)
		);
	}
};
