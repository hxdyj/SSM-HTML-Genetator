let breadcrumbE = {}
Vue.component('g-breadcrumb', {
	props: {
		two: {
			default: ''
		}
	},
	data: function() {
		return {
			userInfo: JSON.parse(localStorage.getItem('userInfo') || {})
		}
	},
	mounted: function() {},
	methods: {
		goHome() {
			location.href =
				this.userInfo._login_type + '_index.' + GetVar.file_suffix
		}
	},
	template: `
<div class="g-breadcrumb">
	<div class="ui breadcrumb large">
		<a class="section" @click="goHome()">首页</a>
		<i class="right angle icon divider" v-show="two"></i>
		<div class="active section" v-show="two">{{two}}</div>
	</div>
</div>
  `
})
