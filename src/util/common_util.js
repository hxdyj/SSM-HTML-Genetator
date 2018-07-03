module.exports = {
	// tid--->Tid
	firstWordUpper: word => {
		return (
			word.substring(0, 1).toUpperCase() + word.substring(1, word.length)
		)
	},
	//获取拥有某个属性的表
	getHasSomeCommentTable: (commonData, param, val) => {
		if (!val) {
			return _.filter(
				commonData.tablesDesc,
				item => item.tableComment[param]
			)
		} else {
			return _.filter(
				commonData.tablesDesc,
				item =>
					item.tableComment[param] &&
					_.includes(item.tableComment[param], val)
			)
		}
	},
	//获取表里拥有某个功能的字段数组
	getTableHasSomeCommentFeild: (table, param) => {
		let params = new Map(
			[...table._commentMap].filter(([k, v]) => v[param])
		)
		return [...params.values()]
	},
	//获取表里拥有某个功能的字段是否包含某个值
	getTableFeildHasSomeVal: (table, param, val) => {
		return _.includes(table.tableComment[param], val)
	}
}
