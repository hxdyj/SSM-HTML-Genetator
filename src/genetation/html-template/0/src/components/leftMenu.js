let leftMenyE = {}
Vue.component('g-left-menu', {
	props: {
		list: {
			default: []
		},
		active: ''
	},
	data: function () { },
	mounted: function () { },
	methods: {},
	template: `
<div class="g-left-menu">
	<div class="g-left-menu-contain">
		<div class="introduce">
			<div class="bg"></div>
			<div class="content">
				梦想开始的地方<br>

				Let's Go
			</div>
		</div>
		<div class="items">
			<div class="item" :class="{'active':active==item.name}" v-for="item in list" @click="()=>{location.href=item.href}">
				<i class="lock icon"></i>
				<span class="title">
					{{item.name}}管理
				</span>
			</div>
		</div>
	</div>
</div>
  `
})
