
function getLoginFormParams(commonData) {//获取在登录表单显示的字段
	let tabel = commonData.tablesDesc[commonData.G.user]
	let params = new Map([...tabel.commentMap].filter(([k, v]) => v.login_form == 'user'))
	return [...params.values()]
}
let isVerify = _.includes(config.html.is_verify_login, 'user')
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.html + 'login.' + config.html.file_suffix;
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(commonData) {
		/* -------  Start ------- */

		this.writeToFile(`
<!DOCTYPE html>
<html>

<head>
	<!-- Standard Meta -->
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

	<!-- Site Properties -->
	<title>${config.html.html_title}</title>
	<link rel="stylesheet" type="text/css" href="./css/semantic.min.css">
	<link rel="stylesheet" type="text/css" href="./css/login.css">
	<script src="./js/jquery.min.js"></script>
	<script src="./js/config.js"></script>
	<script src="./js/semantic.min.js"></script>
	<script src="./js/vue.min.js"></script>
	<script src="./js/lodash.min.js"></script>
	${isVerify ? `
	<script src="./js/gVerify.js"></script>`: ''}

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
				<div class="ui stacked segment">`, true);

		let loginParams = getLoginFormParams(commonData)
		_.forEach(loginParams, item => {
			let data = {
				icon: 'user',
				vModel: 'feild.' + item.feild_name,
				placeholder: item.cn_name || item.feild_name,
			}
			if (item.login_id) {
				_.assign(data, {
					icon: 'user',
				})
			}
			if (item.login_pass) {
				_.assign(data, {
					icon: 'lock',
				})
			}
			this.writeToFile(`
					<div class="field">
						<div class="ui left icon input">
							<i class="${data.icon} icon"></i>
							<input type="text" v-model="${data.vModel}" name="text" placeholder="${data.placeholder}">
						</div>
					</div>`)
		})


		this.writeToFile(`
					${isVerify ?
				`<div style="display: flex">
						<input type="text" id="code_input" value="" placeholder="请输入验证码"  style="border-top-right-radius:0px;border-bottom-right-radius:0px;"/>
						<div id="v_container" style="width: 200px;height: 50px;"></div>
					</div>`: ''}
					<div class="ui fluid large blue submit button" @click="login()" ${isVerify ? `style="margin-top:20px"` : ''}>进入</div>
				</div>

				<div class="ui error message"></div>

			</div>

			<div class="ui message">
				没有账号?
				<a href="register.html">注册</a>
			</div>
		</div>
	</div>
	<script>
		var app = new Vue({
			el: '#app',
			data: {
				feild:{`)
		_.forEach(loginParams, item => {
			this.writeToFile(`
					${item.feild_name}:null,`)
		})

		this.writeToFile(`
				},
				${isVerify ?
				`verifyCode: null,` : ''}

			},`)
		this.writeToFile(`
			mounted() {
				${isVerify ? `this.verifyCode = new GVerify("v_container")` : ''}
			},
			methods: {
				login() {
					if (${_.join(_.map(loginParams, item => '!this.feild.' + item.feild_name), '||')}) {
						alert('${_.join(_.map(loginParams, item => item.cn_name || item.feild_name), '和')}不能为空')
						return
					}
					${isVerify ? `
					let code = app.verifyCode.validate(document.getElementById("code_input").value);
					if (!code) {
						alert("验证码错误")
						return
					}

					G.http('${commonData.G.user.toLowerCase()}/login.do', {
${_.join(_.map(loginParams, item => `\t\t\t\t\t\t${item.feild_name}:app.feild.${item.feild_name}`), ',\n')},
					}).then(data => {
						if (_.isEmpty(data)) {
							alert("${_.join(_.map(loginParams, item => item.cn_name || item.feild_name), '或')}错误")
						} else {
							localStorage.setItem('userInfo', JSON.stringify(data[0]))
							location.href = 'index.html'
						}
					})
					`: ''}
				}
			}`)
		this.writeToFile(`
		})
	</script>
</body>

</html>`)

		/* -------  END ------- */
	}
};
