Vue.component('g-loading', {
	props: {},
	data: function () {
		return {
			isShow: false
		}
	},
	mounted: function () { },
	methods: {
		loading(promiseArr) {
			this.isShow = true
			if (!(promiseArr instanceof Array)) {
				promiseArr = [promiseArr]
			}
			return Promise.all(promiseArr).then(() => {
				setTimeout(() => {
					this.isShow = false
				}, 500)
			})
		}
	},
	template: `
<div class="g-loading" v-show="isShow">
	<img src="../img/loading.svg"/>
</div>
  `
})
