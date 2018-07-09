Vue.component('g-modal', {
	props: {
		name: {
			require: true
		}
	},
	data: function () {
	},
	mounted: function () {
	},
	methods: {
		show() {
			$(`.ui.modal.${this.name}`).modal('show')
		},
		hide() {
			$(`.ui.modal.${this.name}`).modal('hide')
		}
	},
	template: `
	
<div class="g-modal">
	<div class="ui modal" :class="name">
		<slot></slot>
	</div>
</div>
  `
})
