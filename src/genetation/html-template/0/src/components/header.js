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
			}
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
		if (this.headerParams.avatar) {
			this.headerParams.avatar =
				GetVar.http.server + 'system_pic/default_user_icon.jpg'
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
		}
	},
	template: `
<div class="ui top attached teal inverted menu g-header">
	<div class="item">
		<img src="../img/300.jpg" @click="goHome()">
	</div>
	<div class="item">
		<div class="ui medium header g-header-title">人才市场档案管理系统</div>
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
				<img class="ui right spaced avatar image" :src="headerParams.avatar">
				<span class="g-header-username">{{headerParams.name}}<span>
			</a>
			<div class="ui popup bottom left transition hidden g-header-userinfo-actions">

				<!--<img class="ui avatar image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1760172527,1473711532&fm=27&gp=0.jpg">-->
				<img class="ui avatar image" :src="headerParams.avatar">
				<div class="g-header-action-username">
					<h3 class="ui header">{{headerParams.name}}</h3>
				</div>
				<div class="g-header-action-menus">
					<div class="ui basic icon buttons">
						<button class="ui button" data-tooltip="修改信息"  data-position="bottom center"><i class="edit icon"></i></button>
						<button class="ui button" data-tooltip="更换密码"  data-position="bottom center"><i class="lock icon"></i></button>
						<button class="ui button" data-tooltip="我的消息"  data-position="bottom center"><i class="envelope icon"></i></button>
						<button class="ui button" data-tooltip="退出登录"  data-position="bottom center"><i class="sign out alternate icon"></i></button>
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
