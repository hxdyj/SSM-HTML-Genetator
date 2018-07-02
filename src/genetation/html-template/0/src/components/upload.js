Vue.component('g-upload', {
	props: {
		id: {
			default: ''
		},
		accpet: {
			default: 'image/*'
		}
	},
	data: function() {
		return {
			file: ''
		}
	},
	mounted: function() {
		let ele = $('#g_upload_input_' + this.id)
		ele.change(() => {
			let imgEle = $('.g-upload-pre-img-' + this.id)
			imgEle.attr('src', URL.createObjectURL(ele[0].files[0]))
		})
	},
	methods: {
		getFile() {
			return $('#g_upload_input_' + this.id)[0].files[0] || null
		},
		clearFile() {
			this.file = ''
		}
	},
	template: `
<div class="g-upload">
	<div style="height:100%;display:flex;align-items:center">
		<img v-show="file" src="" :class="'g-upload-pre-img-'+id" style="height:100%">
		<i v-show="!file" class="upload icon"></i>
		<input type="file" v-model="file" :accept="accpet" :id="'g_upload_input_'+id" class="upload-input"/>
	</div>
</div>
  `
})
