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
				<div class="table-contain">
					<div class="g-table">
						<div class="table-all">
							<div class="ui top attached menu">
								<div class="ui icon item" @click="showAddModel()">
									<i class="plus icon"></i>
								</div>
								<div class="right menu">
									<div class="ui right aligned category search item">
										<div class="ui transparent icon input">
											<input class="prompt" type="text" placeholder="Search animals...">
											<i class="search link icon"></i>
										</div>
										<div class="results"></div>
									</div>
								</div>
							</div>
							<div class="ui bottom attached segment">
								<table class="ui very basic table">
									<thead>
										<tr>
											<th>Name</th>
											<th>Status</th>
											<th>Notes</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>John</td>
											<td>Approved</td>
											<td>None</td>
										</tr>
										<tr>
											<td>Jamie</td>
											<td>Approved</td>
											<td>Requires call</td>
										</tr>
										<tr>
											<td>Jill</td>
											<td>Denied</td>
											<td>None</td>
										</tr>
									</tbody>
								</table>

							</div>
							<div class="table-page">
								<div class="ui basic icon buttons">
									<button class="ui button">首页</button>
									<button class="ui button">上一页</button>
									<button class="ui button" disable>0/0</button>
									<button class="ui button">下一页</button>
									<button class="ui button">尾页</button>
								</div>
							</div>
						</div>
					</div>
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
			showAddModel() {
				this.$refs.addModel.show()
			},
			hideAddModel() {
				this.$refs.addModel.hide()
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
