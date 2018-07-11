
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="../css/semantic.min.css">
    <link rel="stylesheet" type="text/css" href="../css/base.css">
    <title></title>
</head>

<body>
	<div id="app">
		<g-loading ref="loading"></g-loading>
		<g-modal :name="'add'" ref="addModel">
			<h3>添加借书记录</h3>
			<div class="ui form">
				
				<div class="field">
					<label>借书编号</label>
					<input type="text" v-model="addModel.num" placeholder="借书编号">
				</div>
				<div class="field">
					<label>用户编号</label>
					<input type="text" v-model="addModel.usernum" placeholder="用户编号">
				</div>
				<div class="field">
					<label>姓名</label>
					<input type="text" v-model="addModel.name" placeholder="姓名">
				</div>
				<div class="field">
					<label>借书日期</label>
					<input type="text" v-model="addModel.borrowdate" placeholder="借书日期">
				</div>
				<div class="field">
					<label>信用等级</label>
					<input type="text" v-model="addModel.level" placeholder="信用等级">
				</div>
				<div class="field">
					<label>地址</label>
					<input type="text" v-model="addModel.address" placeholder="地址">
				</div>
				<button class="ui button" type="submit" @click="add()">添加</button>
			</div>
		</g-modal>
		<g-modal :name="'edit'" ref="editModel">
			<h3>修改借书记录</h3>
			<div class="ui form">
				
					<div class="field">
						<label>借书编号</label>
						<input type="text" v-model="editModel.num" placeholder="借书编号">
					</div>
					<div class="field">
						<label>用户编号</label>
						<input type="text" v-model="editModel.usernum" placeholder="用户编号">
					</div>
					<div class="field">
						<label>姓名</label>
						<input type="text" v-model="editModel.name" placeholder="姓名">
					</div>
					<div class="field">
						<label>借书日期</label>
						<input type="text" v-model="editModel.borrowdate" placeholder="借书日期">
					</div>
					<div class="field">
						<label>信用等级</label>
						<input type="text" v-model="editModel.level" placeholder="信用等级">
					</div>
					<div class="field">
						<label>地址</label>
						<input type="text" v-model="editModel.address" placeholder="地址">
					</div>
				<button class="ui button" type="submit" @click="edit()">修改</button>
			</div>
        </g-modal>
        <g-toast ref="toast"></g-toast>
        <g-header></g-header>
        <div class="index-content">
            <div class="index-content-left">
                <g-left-menu :list="list_leftMenu" :active="'借书记录'"></g-left-menu>
            </div>
            <div class="index-content-right">
                <g-breadcrumb :two="'借书记录'"></g-breadcrumb>
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
											<th>借书编号</th>
											<th>用户编号</th>
											<th>姓名</th>
											<th>借书日期</th>
											<th>信用等级</th>
											<th>地址</th>											<th>操作</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(item,$index) in list.list">
																							<td>{{$index}}</td>
																		<td>{{item.num}}</td>
																		<td>{{item.usernum}}</td>
																		<td>{{item.name}}</td>
																		<td>{{item.borrowdate}}</td>
																		<td>{{item.level}}</td>
																		<td>{{item.address}}</td>											<td><i @click="showEditModel(item)" class="edit alternate icon"></i><i @click="del(item)" class="trash alternate outline icon"></i></td>
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
				usernum:'',
				name:'',
				borrowdate:'',
				level:'',
				address:'',
			},
			editModel:{
				
				num:'',
				usernum:'',
				name:'',
				borrowdate:'',
				level:'',
				address:'',
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
				return G.http('borrow/search.do',params).then(resp=>{
					if(resp.data.lastPage<this.page&&resp.data.list.length==0&&this.page!=1){
						this.page--
						this.getModulePage()
						return
					}
					this.list = resp.data
					console.log('%c%s','color:#00A29A;font-weight:600','borrow--LIST:',this.list)
				})
			},
			del(item){
				this.$refs.loading.loading(G.http('borrow/del.do',{id:item.id}).then(resp=>{
					return this.getModulePage().then(()=>{
						this.$refs.toast.show('删除成功')
					})
				}).catch(err=>{
					this.$refs.toast.show('删除失败')
				}))
			},
			add(){
				
				this.$refs.loading.loading(G.http('borrow/add.do',this.addModel).then(resp=>{
					this.$refs.addModel.hide()
					if(resp.code==1){
						this.addModel = {
							
				num:'',
				usernum:'',
				name:'',
				borrowdate:'',
				level:'',
				address:'',
						}
						
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
				
				this.$refs.loading.loading(G.http('borrow/edit.do',this.editModel).then(resp=>{
					this.$refs.editModel.hide()
					if(resp.code==1){
						this.editModel = {
							
				num:'',
				usernum:'',
				name:'',
				borrowdate:'',
				level:'',
				address:'',
							id:''
						}
						
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
				usernum:item.usernum,
				name:item.name,
				borrowdate:item.borrowdate,
				level:item.level,
				address:item.address,
				}
				this.editModel.id = item.id
				
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
            