module.exports = {
	writeToFile(name, line, isReWrite) {
		let fileName =
			config.generateDirs.html_pages +
			`${name}.` +
			config.html.file_suffix
		file_utils.writeLineToFile(line, fileName, isReWrite)
	},
	writeToFiles(commonData) {
		console.log(clc.blue('start genetating web module html template....'))

		let login_default_table =
			G.util.getHasSomeCommentTable(
				commonData,
				'func',
				'loginDefault'
			)[0] || null
		let checkIsLoginHtml = ''
		if (login_default_table) {
			checkIsLoginHtml = `
			if(_.isEmpty(_.values(this.userInfo))){
				location.href = '${
					login_default_table.tableComment._name
				}_login.' + GetVar.file_suffix
			}
			`
		}

		_.forEach(commonData.tablesDesc, (value, key, map) => {
			//获取可以在table展示的字段
			let showFeild = _.filter(
				[...value._commentMap.values()],
				item =>
					!(
						item.front_not_show &&
						_.includes(item.front_not_show, 'table')
					)
			)
			//表格头
			let tableThs = _.join(
				_.map(
					showFeild,
					item => `
\t\t\t\t\t\t\t\t\t\t\t<th>${item.cn_name ||
						G.util.firstWordUpper(item.feild_name)}</th>`
				),
				''
			)

			//添加编号头
			tableThs = '\t\t\t\t\t\t\t\t\t\t\t<th>编号</th>' + tableThs
			tableThs += '\t\t\t\t\t\t\t\t\t\t\t<th>操作</th>'

			//表格列
			let tableTds = _.join(
				_.map(showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
							\t\t\t\t\t\t\t\t\t\t\t<td><div style="height:4rem;" v-show="item.${
								item.feild_name
							}"><img :src="GetVar.http.server+'pic/'+item.${
								item.feild_name
							}" style="height: 100%;"/></div><span v-show="!item.${
								item.feild_name
							}">无</span></td>`
						}
					} else {
						return `
							\t\t\t\t\t\t\t\t\t\t\t<td>{{item.${item.feild_name}}}</td>`
					}
					return ''
				}),
				''
			)

			//添加编号列
			tableTds = '\t\t\t\t\t\t\t\t\t\t\t<td>{{$index}}</td>' + tableTds
			tableTds +=
				'\t\t\t\t\t\t\t\t\t\t\t<td><i @click="showEditModel(item)" class="edit alternate icon"></i><i @click="del(item)" class="trash alternate outline icon"></i></td>'

			//过滤添加弹框的字段
			let addModal_showFeild = _.filter(
				[...value._commentMap.values()],
				item =>
					!(
						item.front_not_show &&
						_.includes(item.front_not_show, 'add')
					)
			)

			let addModal_vueModel = _.join(
				_.map(
					addModal_showFeild,
					item => `
				${item.feild_name}:'',`
				),
				''
			)
			let addModal_inputHtml = _.join(
				_.map(addModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
				<div class="field">
					<label>${item.cn_name || item.feild_name}</label>
					<g-upload ref="${key +
						'_g_upload_ref_add_modal_' +
						item.feild_name}" :id="'${key}-g-upload-add-modal-${
								item.feild_name
							}'"></g-upload>
				</div>

							`
						}
					} else {
						return `
				<div class="field">
					<label>${item.cn_name || item.feild_name}</label>
					<input type="text" v-model="addModel.${
						item.feild_name
					}" placeholder="${item.cn_name || item.feild_name}">
				</div>`
					}
				}),
				''
			)

			let addMethodFileHtml = _.join(
				_.map(addModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
							this.addModel['${item.feild_name}'] = this.$refs.${key +
								'_g_upload_ref_add_modal_' +
								item.feild_name}.getFile()
							`
						}
					} else {
						return ''
					}
				}),
				''
			)
			let addMethodFileResetHtml = _.join(
				_.map(addModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
							this.$refs.${key + '_g_upload_ref_add_modal_' + item.feild_name}.clearFile()
							`
						}
					} else {
						return ''
					}
				}),
				''
			)
			//过滤修改弹框的字段
			let editModal_showFeild = _.filter(
				[...value._commentMap.values()],
				item =>
					!(
						item.front_not_show &&
						_.includes(item.front_not_show, 'edit')
					)
			)

			let editModal_vueModel = _.join(
				_.map(
					editModal_showFeild,
					item => `
				${item.feild_name}:'',`
				),
				''
			)

			let editModal_vueSelectItem = _.join(
				_.map(
					editModal_showFeild,
					item => `
				${item.feild_name}:item.${item.feild_name},`
				),
				''
			)
			let editModal_inputHtml = _.join(
				_.map(editModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
				<div class="field">
					<label>${item.cn_name || item.feild_name}</label>
					<g-upload ref="${key +
						'_g_upload_ref_edit_modal_' +
						item.feild_name}" :id="'${key}-g-upload-edit-modal-${
								item.feild_name
							}'"></g-upload>
				</div>

							`
						}
					} else {
						return `
					<div class="field">
						<label>${item.cn_name || item.feild_name}</label>
						<input type="text" v-model="editModel.${
							item.feild_name
						}" placeholder="${item.cn_name || item.feild_name}">
					</div>`
					}
				}),
				''
			)

			let editMethodFileHtml = _.join(
				_.map(editModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
							let _file = this.$refs.${key +
								'_g_upload_ref_edit_modal_' +
								item.feild_name}.getFile()
							if(_file){
									this.editModel['${item.feild_name}'] = _file
							}
							`
						}
					} else {
						return ''
					}
				}),
				''
			)
			let editMethodFileSetDefaultHtml = _.join(
				_.map(editModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
 								this.$refs.${key +
									'_g_upload_ref_edit_modal_' +
									item.feild_name}.setHttpImg(this.editModel.${
								item.feild_name
							})
							`
						}
					} else {
						return ''
					}
				}),
				''
			)
			let editMethodFileResetHtml = _.join(
				_.map(editModal_showFeild, item => {
					if (item.file_type) {
						if (item.file_type == 'img') {
							return `
							this.$refs.${key + '_g_upload_ref_edit_modal_' + item.feild_name}.clearFile()
							`
						}
					} else {
						return ''
					}
				}),
				''
			)

			this.writeToFile(
				key.toLowerCase(),
				`
${file_utils.fileTypeHtml()}
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../css/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="../css/base.css">
    <title>${config.html.html_title}</title>
</head>

<body>
	<div id="app">
		<g-loading ref="loading"></g-loading>
		<g-modal :name="'add'" ref="addModel">
			<h3>添加${value.tableComment.cn_name || key}</h3>
			<div class="ui form">
				${addModal_inputHtml}
				<button class="ui button" type="submit" @click="add()">添加</button>
			</div>
		</g-modal>
		<g-modal :name="'edit'" ref="editModel">
			<h3>修改${value.tableComment.cn_name || key}</h3>
			<div class="ui form">
				${editModal_inputHtml}
				<button class="ui button" type="submit" @click="edit()">修改</button>
			</div>
        </g-modal>
        <g-toast ref="toast"></g-toast>
        <g-header></g-header>
        <div class="index-content">
            <div class="index-content-left">
                <g-left-menu :list="list_leftMenu" :active="'${value
					.tableComment.cn_name || key}'"></g-left-menu>
            </div>
            <div class="index-content-right">
                <g-breadcrumb :two="'${value.tableComment.cn_name ||
					key.toLowerCase()}'"></g-breadcrumb>
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
                                            <input class="prompt" type="text" v-model="seachStr" @input="search()" placeholder="搜索...">
                                            <i class="search link icon"></i>
                                        </div>
                                        <div class="results"></div>
                                    </div>
                                </div>
                            </div>
							<div class="ui bottom attached segment">
								<div v-show="list.list.length!=0">
									<table class="ui very basic table">
										<thead>
											<tr>
												${tableThs}
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item,$index) in list.list">
												${tableTds}
											</tr>

										</tbody>
									</table>
								</div>
								<div v-show="list.list.length==0" style="display:flex;justify-content:center;color:#5171F9">
									<i class="info circle icon"></i>暂无数据
								</div>


                            </div>
                            <div class="table-page">
                                <div class="ui basic icon buttons">
                                    <button class="ui button" @click="changePage(1)">首页</button>
                                    <button class="ui button"  @click="changePage(page-1)">上一页</button>
                                    <button class="ui button" disable>{{list.lastPage==0?0:page}}/{{list.lastPage}}</button>
                                    <button class="ui button"  @click="changePage(page+1)">下一页</button>
                                    <button class="ui button" @click="changePage(list.lastPage)">尾页</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
<script src="../js/vue.min.js"></script>
<script src="../js/jquery.min.js"></script>
<script src="../js/lodash.min.js"></script>
<script src="../js/semantic.min.js"></script>
<script src="../js/moment.min.js"></script>
<script src="../js/Uri.js"></script>
<script src="../js/config.js"></script>
<script src="../js/get.var.js"></script>
<script src="../components/modal.js"></script>
<script src="../components/header.js"></script>
<script src="../components/leftMenu.js"></script>
<script src="../components/breadcrumb.js"></script>
<script src="../components/toast.js"></script>
<script src="../components/loading.js"></script>
<script src="../components/upload.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
			userInfo:JSON.parse(localStorage.getItem('userInfo') || {}),
            message: 'Hello Vue!',
			list_leftMenu:[],
			page:1,
			seachStr:null,
			GetVar:GetVar,
			list:{
				list:[]
			},
			addModel:{
				${addModal_vueModel}
			},
			editModel:{
				${editModal_vueModel}
				id:''
			}
		},
		mounted(){
			${checkIsLoginHtml}
			this.$refs.loading.loading([
				this.getMenus(),
				this.getModulePage(),
			])

		},
        methods: {
			getMenus(){
				return G.http('json/menu.json').then(resp=>{
					this.list_leftMenu = resp
				})
			},
			async search(){
				this.$refs.loading.loading(await this.getModulePage())
			},
			getModulePage(){

				let params = {page:this.page}

				if(this.seachStr){
					params['page'] = 1
					params['id'] = this.seachStr
				}
				return G.http('${value.tableComment._name}/search.do',params).then(resp=>{
					if(resp.data.lastPage<this.page&&resp.data.list.length==0&&this.page!=1){
						this.page--
						this.getModulePage()
						return
					}
					this.list = resp.data
					console.log('%c%s','color:#00A29A;font-weight:600','${
						value.tableComment._name
					}--LIST:',this.list)
				})
			},
			del(item){
				this.$refs.loading.loading(G.http('${
					value.tableComment._name
				}/del.do',{id:item.id}).then(resp=>{
					return this.getModulePage().then(()=>{
						this.$refs.toast.show('删除成功')
					})
				}).catch(err=>{
					this.$refs.toast.show('删除失败')
				}))
			},
			add(){
				${addMethodFileHtml}
				this.$refs.loading.loading(G.http('${
					value.tableComment._name
				}/add.do',this.addModel).then(resp=>{
					this.$refs.addModel.hide()
					if(resp.code==1){
						this.addModel = {
							${addModal_vueModel}
						}
						${addMethodFileResetHtml}
						return this.getModulePage().then(()=>{
							this.$refs.toast.show(resp.msg)
						})
					}else{
						this.$refs.toast.show(resp.msg)
					}


				}).catch(err=>{
					this.$refs.toast.show('添加失败')
				}))
			},
			edit(){
				${editMethodFileHtml}
				this.$refs.loading.loading(G.http('${
					value.tableComment._name
				}/edit.do',this.editModel).then(resp=>{
					this.$refs.editModel.hide()
					if(resp.code==1){
						this.editModel = {
							${editModal_vueModel}
							id:''
						}
						${editMethodFileResetHtml}
						return this.getModulePage().then(()=>{
							this.$refs.toast.show(resp.msg)
						})
					}else{
						this.$refs.toast.show(resp.msg)
					}



				}).catch(err=>{
					this.$refs.toast.show('修改失败')
				}))
			},
            showAddModel() {
                this.$refs.addModel.show()
			},
			showEditModel(item) {
				this.editModel = {
					${editModal_vueSelectItem}
				}
				this.editModel.id = item.id
				${editMethodFileSetDefaultHtml}
				this.$refs.editModel.show()

			},
			changePage(page){
				if(page<1||(page==1 && this.page==1)){
					this.$refs.toast.show('已到首页')
					return
				}

				if(page>this.list.lastPage||(page==this.list.lastPage && this.page==this.list.lastPage)){
					this.$refs.toast.show('已到尾页')
					return
				}

				if(page>=1&&page<=this.list.lastPage){
					this.page=page
					this.$refs.loading.loading(this.getModulePage())
				}

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
		})
	}
}
