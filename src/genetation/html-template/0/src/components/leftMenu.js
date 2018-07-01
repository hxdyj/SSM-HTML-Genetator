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
				任劳任怨<br> 尽职尽责<br> 精益求精<br>
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
