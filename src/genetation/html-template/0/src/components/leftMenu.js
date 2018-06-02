let leftMenyE = {}
Vue.component('g-left-menu', {
	props: {},
	data: function() {},
	mounted: function() {},
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
			<div class="item active">
				<i class="lock icon"></i>
				<span class="title">
					商品管理
				</span>
			</div>
			<div class="item">
				<i class="lock icon"></i>
				<span class="title">
					用户管理
				</span>
			</div>
			<div class="item">
				<i class="lock icon"></i>
				<span class="title">
					权限管理
				</span>
			</div>
		</div>
	</div>
</div>
  `
})
