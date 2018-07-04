//获取表里拥有某个功能的字段数组
let getTableHasSomeCommentFeild = (table, param) => {
	let params = new Map([...table._commentMap].filter(([k, v]) => v[param]))
	return [...params.values()]
}

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
	getTableHasSomeCommentFeild,
	//获取表里拥有某个功能的字段是否包含某个值
	getTableFeildHasSomeVal: (table, param, val) => {
		return _.includes(table.tableComment[param], val)
	},
	//获取表里拥有某个功能的字段是否等于某个值
	getTableFeildEqualSomeVal: (table, param, val) => {
		let tmp = getTableHasSomeCommentFeild(table, param)
		tmp = _.filter(tmp, item => item[param] == val)[0]
		let result = null
		if (tmp) {
			result = tmp.feild_name
		}
		return result
	}
}
