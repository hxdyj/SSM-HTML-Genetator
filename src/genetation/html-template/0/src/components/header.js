let headerE = {
	search: 'search',
	input: 'input'
}
Vue.component('g-header', {
	props: {
		showSearch: {
			default: false
		}
	},
	data: function() {
		return {
			searchStr: '',
			userInfo: JSON.parse(localStorage.getItem('userInfo') || {}),
			headerParams: {
				avatar: '',
				pass: '',
				name: ''
			},
			pass: {
				old: '',
				new: '',
				renew: ''
			},
			htmlConfig: GetVar.htmlConfig
		}
	},
	mounted: function() {
		this.headerParams = {
			avatar: this.userInfo[
				GetVar.headerParams[this.userInfo._login_type].avatar
			],
			pass: this.userInfo[
				GetVar.headerParams[this.userInfo._login_type].pass
			],
			name: this.userInfo[
				GetVar.headerParams[this.userInfo._login_type].name
			]
		}

		//未设置头像的设置默认头像
		if (!this.headerParams.avatar) {
			//服务器地址
			/* this.headerParams.avatar =
				GetVar.http.server + 'system_pic/default_user_icon.jpg' */
			//本地img
			this.headerParams.avatar = '../img/default_user_icon.jpg'
		} else {
			this.headerParams.avatar =
				GetVar.http.server + 'pic/' + this.headerParams.avatar
		}

		$('.g-header-user').popup({
			on: 'click',
			position: 'bottom right'
		})
	},
	methods: {
		search() {
			this.$emit(headerE.search, this.searchStr)
		},
		goHome() {
			location.href =
				this.userInfo._login_type + '_index.' + GetVar.file_suffix
		},
		loginOut() {
			location.href =
				this.userInfo._login_type + '_login.' + GetVar.file_suffix
			localStorage.removeItem('userInfo')
		},
		resetPass() {
			if (!this.pass.old || !this.pass.new || !this.pass.renew) {
				alert('请完整填写表单信息')
				return
			}
			if (
				this.userInfo[
					GetVar.headerParams[this.userInfo._login_type].pass
				] != this.pass.old
			) {
				alert('密码错误')
				return
			}

			if (
				this.userInfo[
					GetVar.headerParams[this.userInfo._login_type].pass
				] == this.pass.old &&
				this.pass.new != this.pass.renew
			) {
				alert('两次密码不一致')
				return
			}
			let data = {
				id: this.userInfo.id
			}
			data[
				GetVar.headerParams[this.userInfo._login_type].pass
			] = this.pass.renew
			G.http(this.userInfo._login_type + '/edit.do', data)
				.then(resp => {
					alert('修改成功')
					this.loginOut()
				})
				.catch(err => {
					alert('修改失败')
				})
		}
	},
	template: `
<div class="ui top attached teal inverted menu g-header">
	<g-modal :name="'changePass'" ref="pass">
		<h3>修改密码</h3>
		<div class="ui form">

			<div class="field">
				<label>旧密码</label>
				<input type="text" v-model="pass.old" placeholder="旧密码">
			</div>
			<div class="field">
				<label>新密码</label>
				<input type="text" v-model="pass.new" placeholder="新密码">
			</div>
			<div class="field">
				<label>验证密码</label>
				<input type="text" v-model="pass.renew" placeholder="验证密码">
			</div>
			<button class="ui button" type="submit" @click="resetPass()">修改</button>
		</div>
	</g-modal>
	<div class="item">
		<img :src="'../img/'+htmlConfig.header.img" @click="goHome()">
	</div>
	<div class="item">
		<div class="ui medium header g-header-title">{{htmlConfig.header.title}}</div>
	</div>
	<div class="ui left aligned category search item g-header-search" v-show="showSearch">
		<div class="ui transparent icon input">
		<input class="prompt" type="text" v-model="searchStr" @input="search()" placeholder="Search ..." @keyup.enter="search()">
		<i class="search link icon" @click="search()"></i>
	</div>
	<div class="results"></div>
  </div>
  <div class="right menu g-header-actions">
		<div class="item">
			<a class="ui label g-header-user teal inverted">
				<img class="ui right spaced avatar image" :src="headerParams.avatar" style="width:2.3rem !important;height:2.3rem !important">
				<span class="g-header-username">{{headerParams.name}}<span>
			</a>
			<div class="ui popup bottom left transition hidden g-header-userinfo-actions">

				<img class="ui avatar image" :src="headerParams.avatar">
				<div class="g-header-action-username">
					<h3 class="ui header">{{headerParams.name}}</h3>
				</div>
				<div class="g-header-action-menus">
					<div class="ui basic icon buttons">
						<!--<button class="ui button" data-tooltip="修改信息"  data-position="bottom center"><i class="edit icon"></i></button>-->
						<button class="ui button" data-tooltip="更换密码" @click="$refs.pass.show()"  data-position="bottom center"><i class="lock icon"></i></button>
						<!--<button class="ui button" data-tooltip="我的消息"  data-position="bottom center"><i class="envelope icon"></i></button>-->
						<button @click="loginOut()" class="ui button" data-tooltip="退出登录"  data-position="bottom center"><i class="sign out alternate icon"></i></button>
					</div>
				</div>

			</div>
		</div>

  </div>
</div>
<div class="ui bottom attached segment">
  <p></p>
</div>
  `
})
