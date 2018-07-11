let leftMenyE = {}
Vue.component('g-left-menu', {
	props: {
		list: {
			default: []
		},
		active: '',
		endName: '管理'
	},
	data: function() {
		return {
			htmlConfig: GetVar.htmlConfig
		}
	},
	mounted: function() {},
	methods: {},
	template: `
<div class="g-left-menu">
	<div class="g-left-menu-contain">
		<div class="introduce">
			<div class="bg" :style="{background:'url(../img/'+htmlConfig.leftMenu.img+')',backgroundSize: 'cover',filter: 'blur(0.6rem)',height: '100%'}"></div>
			<div class="content" v-html="htmlConfig.leftMenu.content">
			</div>
		</div>
		<div class="items">
			<div class="item" :class="{'active':active==item.name}" v-for="item in list" @click="()=>{location.href=item.href}">
				<i class="icon" :class="item.icon"></i>
				<span class="title">
					{{item.name}}{{endName}}
				</span>
			</div>
		</div>
	</div>
</div>
  `
})
