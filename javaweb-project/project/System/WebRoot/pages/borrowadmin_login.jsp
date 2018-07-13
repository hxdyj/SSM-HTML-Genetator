
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
<!-- Standard Meta -->
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<!-- Site Properties -->
<title>图书管理后台系统</title>
<link rel="stylesheet" type="text/css" href="../css/semantic.min.css">
<link rel="stylesheet" type="text/css" href="../css/login.css">
<script src="../js/jquery.min.js"></script>
<script src="../js/config.js"></script>
<script src="../js/get.var.js"></script>
<script src="../js/semantic.min.js"></script>
<script src="../js/vue.min.js"></script>
<script src="../js/lodash.min.js"></script>



<style type="text/css">
body>.grid {
	height: 100%;
}

.image {
	margin-top: -100px;
}

.column {
	max-width: 450px;
}
</style>

</head>

<body>

<div class="ui middle aligned center aligned grid" id="app">
	<div class="column">
		<h2 class="ui teal image header">
			<div class="content" style="color: white">
				登录
			</div>
		</h2>
		<div class="ui large form">
			<div class="ui stacked segment">
				<div class="field">
					<div class="ui left icon input">
						<i class="user icon"></i>
						<input type="text" v-model="feild.loginid" name="text" placeholder="账号">
					</div>
				</div>
				<div class="field">
					<div class="ui left icon input">
						<i class="user icon"></i>
						<input type="text" v-model="feild.pass" name="text" placeholder="密码">
					</div>
				</div>
				
				<div class="ui fluid large blue submit button" @click="login()" >进入</div>
			</div>

			<div class="ui error message"></div>

		</div>

		<div class="ui message">
			没有账号?
			<a href="borrowadmin_register.jsp">注册</a>
		</div>
	</div>
</div>
<script>
var app = new Vue({
	el: '#app',
	data: {
		userInfo:JSON.parse(localStorage.getItem('userInfo') || '{}'),
		feild:{
			loginid:null,
			pass:null,
		},
		

	},
	mounted() {
		if(!_.isEmpty(_.values(this.userInfo)) && _.includes(location.href,this.userInfo._login_type+'_login')){
			location.href = this.userInfo._login_type + '_index.' + GetVar.file_suffix
		}
		
	},
	methods: {
		login() {
			if (!this.feild.loginid||!this.feild.pass) {
				alert('账号和密码不能为空')
				return
			}
			
			G.http('borrowadmin/login.do', {
				loginid:app.feild.loginid,
				pass:app.feild.pass,
			}).then(data => {
				if (_.isEmpty(data)) {
					alert("账号或密码错误")
				} else {
					data[0]._login_type = 'borrowadmin'
					localStorage.setItem('userInfo', JSON.stringify(data[0]))
					location.href = 'borrowadmin_index.jsp'
				}
			})
		}
	}
})
</script>
</body>

</html>