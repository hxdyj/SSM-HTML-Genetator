let tableE = {}
Vue.component('g-table', {
	props: {},
	data: function() {},
	mounted: function() {},
	methods: {
		showAddModel() {
			this.$refs.addModel.show()
		},
		hideAddModel() {
			this.$refs.addModel.hide()
		},
		toast() {
			this.$refs.toast.show('Hahaha')
		}
	},
	template: `
<div class="g-table">
	<div class="table-all">
		<div class="ui top attached menu">
			<div class="ui icon item" @click="showAddModel()">
				<i class="plus icon"></i>
			</div>
			<div class="ui icon item" @click="toast()">
				<i class="plus icon"></i>
			</div>
			<div class="right menu">
				<div class="ui right aligned category search item">
					<div class="ui transparent icon input">
						<input class="prompt" type="text" placeholder="Search animals...">
						<i class="search link icon"></i>
					</div>
					<div class="results"></div>
				</div>
			</div>
		</div>
		<div class="ui bottom attached segment">
			<table class="ui very basic table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John</td>
						<td>Approved</td>
						<td>None</td>
					</tr>
					<tr>
						<td>Jamie</td>
						<td>Approved</td>
						<td>Requires call</td>
					</tr>
					<tr>
						<td>Jill</td>
						<td>Denied</td>
						<td>None</td>
					</tr>
				</tbody>
			</table>

		</div>
		<div class="table-page">
			<div class="ui basic icon buttons">
				<button class="ui button">首页</button>
				<button class="ui button">上一页</button>
				<button class="ui button" disable>0/0</button>
				<button class="ui button">下一页</button>
				<button class="ui button">尾页</button>
			</div>
		</div>
	</div>
	<g-modal :name="'add'" ref="addModel">
			TEST
	</g-modal>
	<g-toast  ref="toast"></g-toast>
</div>
  `
})
