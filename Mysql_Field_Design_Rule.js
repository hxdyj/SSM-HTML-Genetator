let FieldComment = {
	//field comment types:
	cn_name: '', //field china name
	login_id: '', //true|false
	pass: '', //true|false
	not_in_param: ['------> see bottom field not_in_param data   <----------'], //define this field in ssm controller which method param not in.
	java_type: '------> see bottom field java_type.upload data  <----------', //upload | ...--->upload can define here. in () can omit,
	permission: { 0: 'student', 1: 'teacher' }, //data only for example
	foreign: '', //foreign table name
	html_temp: {
		//genetate html template vars
		field_type: '', //avatar|datetime|username
		check: '', //is need to check while form submit
		show: '' //if show this feild while add or update form
	}
};

let TableComment = {
	cn_name: '', //table china name
	permission: [0, 1] //data only for example
};
console.log(
	JSON.stringify({
		java_type: 'upload'
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
