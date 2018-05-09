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
		}
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
