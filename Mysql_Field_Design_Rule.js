// 用来往数据库添加备注的时候使用
console.log(
	JSON.stringify({
		not_in_param: ['add', 'edit']
	})
)

module.exports = {
	field: {
		java_type: {
			upload: {
				key: 'upload',
				value: 'MultipartFile'
			}
		},
		not_in_param: {
			add: 'add',
			edit: 'edit',
			search: 'search'
		}
	}
}
