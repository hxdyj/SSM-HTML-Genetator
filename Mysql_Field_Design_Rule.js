let FieldComment = {
	//field comment types:
	cn_name: '', //field china name
	login_id: '', //true|false
	pass: '', //true|false
	java_type: '', //Integer|String|MultipartFile
	permission: { 0: 'student', 1: 'teacher' }, //data only for example
	foreign: '', //foreign table name
	html_temp: {
		//genetate html template vars
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
		cn_name: '用户'
	})
);
