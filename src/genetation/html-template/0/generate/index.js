module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.html + 'index.' + config.html.file_suffix
		file_utils.writeLineToFile(line, fileName, isReWrite)
	},
	writeToFiles(commonData) {
		console.log(clc.blue('start genetating web index html template....'))
		this.writeToFile(
			`
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" type="text/css" href="./css/semantic.min.css">
	<link rel="stylesheet" type="text/css" href="./css/base.css">
	<title>${config.html.html_title}</title>
</head>

<body>
	<div id="app">

		<g-modal :name="'add'" ref="addModel">
			Test
		</g-modal>

		<g-toast ref="toast"></g-toast>
		<g-header></g-header>
		<div class="index-content">
			<div class="index-content-left">
				<g-left-menu :list="list_leftMenu"></g-left-menu>
			</div>
			<div class="index-content-right">
				<g-breadcrumb></g-breadcrumb>
				<div style="display:flex;justify-content:center;margin-top:16rem;color:#c1c1c1;">
					<h2>
						欢迎您登录${config.html.html_title}
					</h2>
				</div>
			</div>
		</div>
	</div>

</body>
<script src="./js/jquery.min.js"></script>
<script src="./js/lodash.min.js"></script>
<script src="./js/semantic.min.js"></script>
<script src="./js/moment.min.js"></script>
<script src="./js/Uri.js"></script>
<script src="./js/vue.min.js"></script>
<script src="./js/config.js"></script>
<script src="./components/modal.js"></script>
<script src="./components/header.js"></script>
<script src="./components/leftMenu.js"></script>
<script src="./components/breadcrumb.js"></script>
<script src="./components/toast.js"></script>
<script>
	var app = new Vue({
		el: '#app',
		data: {
			message: 'Hello Vue!',
			list_leftMenu:[]
		},
		mounted(){
			this.getMenus()
		},
		methods: {
			getMenus(){
				G.http('json/menu.json').then(resp=>{
					this.list_leftMenu = resp
				})
			},
			toast() {
				this.$refs.toast.show('Hahaha')
			}
		}
	})
</script>

</html>
		`,
			true
		)
	}
}
