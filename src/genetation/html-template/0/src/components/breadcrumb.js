let breadcrumbE = {}
Vue.component('g-breadcrumb', {
	props: {
		two: {
			default: ''
		}
	},
	data: function () { },
	mounted: function () { },
	methods: {},
	template: `
<div class="g-breadcrumb">
	<div class="ui breadcrumb large">
		<a class="section" href="/">首页</a>
		<i class="right angle icon divider" v-show="two"></i>
		<div class="active section" v-show="two">{{two}}</div>
	</div>
</div>
  `
})
