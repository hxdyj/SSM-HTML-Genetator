Vue.component('g-toast', {
	props: {},
	data: function() {
		return {
			isShow: false,
			msg: ''
		}
	},
	mounted: function() {},
	methods: {
		show(msg) {
			this.msg = msg
			this.isShow = true
			setTimeout(() => {
				this.isShow = false
			}, 1000)
		}
	},
	template: `
<div class="g-toast" v-show="isShow">
	{{msg}}
</div>
  `
})
