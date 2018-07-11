
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../css/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="../css/base.css">
    <title>图书管理后台系统</title>
</head>

<body>
	<div id="app">
		<g-loading ref="loading"></g-loading>
		<g-modal :name="'add'" ref="addModel">
			<h3>添加图书</h3>
			<div class="ui form">
				
				<div class="field">
					<label>书号</label>
					<input type="text" v-model="addModel.num" placeholder="书号">
				</div>
				<div class="field">
					<label>书名</label>
					<input type="text" v-model="addModel.name" placeholder="书名">
				</div>
				<div class="field">
					<label>封面</label>
					<g-upload ref="Book_g_upload_ref_add_modal_img" :id="'Book-g-upload-add-modal-img'"></g-upload>
				</div>

							
				<div class="field">
					<label>出版日期</label>
					<input type="text" v-model="addModel.publishdate" placeholder="出版日期">
				</div>
				<div class="field">
					<label>图书等级</label>
					<input type="text" v-model="addModel.level" placeholder="图书等级">
				</div>
				<div class="field">
					<label>出版社</label>
					<input type="text" v-model="addModel.press" placeholder="出版社">
				</div>
				<button class="ui button" type="submit" @click="add()">添加</button>
			</div>
		</g-modal>
		<g-modal :name="'edit'" ref="editModel">
			<h3>修改图书</h3>
			<div class="ui form">
				
					<div class="field">
						<label>书号</label>
						<input type="text" v-model="editModel.num" placeholder="书号">
					</div>
					<div class="field">
						<label>书名</label>
						<input type="text" v-model="editModel.name" placeholder="书名">
					</div>
				<div class="field">
					<label>封面</label>
					<g-upload ref="Book_g_upload_ref_edit_modal_img" :id="'Book-g-upload-edit-modal-img'"></g-upload>
				</div>

							
					<div class="field">
						<label>出版日期</label>
						<input type="text" v-model="editModel.publishdate" placeholder="出版日期">
					</div>
					<div class="field">
						<label>图书等级</label>
						<input type="text" v-model="editModel.level" placeholder="图书等级">
					</div>
					<div class="field">
						<label>出版社</label>
						<input type="text" v-model="editModel.press" placeholder="出版社">
					</div>
				<button class="ui button" type="submit" @click="edit()">修改</button>
			</div>
        </g-modal>
        <g-toast ref="toast"></g-toast>
        <g-header></g-header>
        <div class="index-content">
            <div class="index-content-left">
                <g-left-menu :list="list_leftMenu" :active="'图书'"></g-left-menu>
            </div>
            <div class="index-content-right">
                <g-breadcrumb :two="'图书'"></g-breadcrumb>
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
																							<th>编号</th>
											<th>书号</th>
											<th>书名</th>
											<th>封面</th>
											<th>出版日期</th>
											<th>图书等级</th>
											<th>出版社</th>											<th>操作</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item,$index) in list.list">
																							<td>{{$index}}</td>
																		<td>{{item.num}}</td>
																		<td>{{item.name}}</td>
																		<td><div style="height:4rem;" v-show="item.img"><img :src="GetVar.http.server+'pic/'+item.img" style="height: 100%;"/></div><span v-show="!item.img">无</span></td>
																		<td>{{item.publishdate}}</td>
																		<td>{{item.level}}</td>
																		<td>{{item.press}}</td>											<td><i @click="showEditModel(item)" class="edit alternate icon"></i><i @click="del(item)" class="trash alternate outline icon"></i></td>
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
			userInfo:JSON.parse(localStorage.getItem('userInfo') || '{}'),
            message: 'Hello Vue!',
			list_leftMenu:[],
			page:1,
			seachStr:null,
			GetVar:GetVar,
			list:{
				list:[]
			},
			addModel:{
				
				num:'',
				name:'',
				img:'',
				publishdate:'',
				level:'',
				press:'',
			},
			editModel:{
				
				num:'',
				name:'',
				img:'',
				publishdate:'',
				level:'',
				press:'',
				id:''
			}
		},
		mounted(){
			
			if(_.isEmpty(_.values(this.userInfo))){
				location.href = 'borrowadmin_login.' + GetVar.file_suffix
			}
			
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
				return G.http('book/search.do',params).then(resp=>{
					if(resp.data.lastPage<this.page&&resp.data.list.length==0&&this.page!=1){
						this.page--
						this.getModulePage()
						return
					}
					this.list = resp.data
					console.log('%c%s','color:#00A29A;font-weight:600','book--LIST:',this.list)
				})
			},
			del(item){
				this.$refs.loading.loading(G.http('book/del.do',{id:item.id}).then(resp=>{
					return this.getModulePage().then(()=>{
						this.$refs.toast.show('删除成功')
					})
				}).catch(err=>{
					this.$refs.toast.show('删除失败')
				}))
			},
			add(){
				
							this.addModel['img'] = this.$refs.Book_g_upload_ref_add_modal_img.getFile()
							
				this.$refs.loading.loading(G.http('book/add.do',this.addModel).then(resp=>{
					this.$refs.addModel.hide()
					if(resp.code==1){
						this.addModel = {
							
				num:'',
				name:'',
				img:'',
				publishdate:'',
				level:'',
				press:'',
						}
						
							this.$refs.Book_g_upload_ref_add_modal_img.clearFile()
							
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
				
							let _file = this.$refs.Book_g_upload_ref_edit_modal_img.getFile()
							if(_file){
									this.editModel['img'] = _file
							}
							
				this.$refs.loading.loading(G.http('book/edit.do',this.editModel).then(resp=>{
					this.$refs.editModel.hide()
					if(resp.code==1){
						this.editModel = {
							
				num:'',
				name:'',
				img:'',
				publishdate:'',
				level:'',
				press:'',
							id:''
						}
						
							this.$refs.Book_g_upload_ref_edit_modal_img.clearFile()
							
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
					
				num:item.num,
				name:item.name,
				img:item.img,
				publishdate:item.publishdate,
				level:item.level,
				press:item.press,
				}
				this.editModel.id = item.id
				
 								this.$refs.Book_g_upload_ref_edit_modal_img.setHttpImg(this.editModel.img)
							
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
            