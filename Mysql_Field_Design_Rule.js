
console.log(
	JSON.stringify({
		globle_field: 'username'
	})
);

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
			query: 'query'
		}
	}
};
