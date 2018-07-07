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
			file: '',
			httpImg: false
		}
	},
	mounted: function() {
		let ele = $('#g_upload_input_' + this.id)
		ele.change(() => {
			$('.g-upload-pre-img-' + this.id).attr(
				'src',
				URL.createObjectURL(ele[0].files[0])
			)
		})
	},
	methods: {
		getFile() {
			return $('#g_upload_input_' + this.id)[0].files[0] || ''
		},
		setHttpImg(name) {
			this.httpImg = true
			let ele = $('.g-upload-pre-img-' + this.id)
			ele.attr('src', GetVar.http.server + 'pic/' + name)
			if (!ele[0].complete) {
				this.httpImg = false
				//ele.attr('src', GetVar.http.server + 'system_pic/no_img.png')
			}
		},
		clearFile() {
			this.file = ''
		}
	},
	template: `
<div class="g-upload">
	<div style="height:100%;display:flex;align-items:center">
		<img v-show="file||httpImg" src="" :class="'g-upload-pre-img-'+id" style="height:100%">
		<i v-show="!(file||httpImg)" class="upload icon"></i>
		<input type="file" v-model="file" :accept="accpet" :id="'g_upload_input_'+id" class="upload-input"/>
	</div>
</div>
  `
})
