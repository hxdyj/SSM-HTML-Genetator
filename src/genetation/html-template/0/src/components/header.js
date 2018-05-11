Vue.component("g-header", {
	data: function() {
		return {
			count: 0
		};
	},
	mounted: function() {
		$(".g-header-user").popup({
			on: "click",
			position: "bottom right"
		});
	},
	template: `
<div class="ui top attached teal inverted menu g-header">
	<div class="item">
		<img src="../img/logo.png">
	</div>
	<div class="item">
		<div class="ui medium header g-header-title">Medium Header</div>
	</div>
	<div class="ui left aligned category search item g-header-search">
	<div class="ui transparent icon input">
	<input class="prompt" type="text" placeholder="Search ...">
	<i class="search link icon"></i>
	</div>
	<div class="results"></div>
  </div>
  <div class="right menu">
		<div class="item">
			<a class="ui label g-header-user teal inverted">
				<img class="ui right spaced avatar image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1760172527,1473711532&fm=27&gp=0.jpg">
				<span class="g-header-username">Elliot<span>
			</a>
			<div class="ui popup bottom left transition hidden g-header-userinfo-actions">
				
				<img class="ui avatar image" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1760172527,1473711532&fm=27&gp=0.jpg">
				<div class="g-header-action-username">
					<h3 class="ui header">Elliot</h3>
				</div>
				<div class="g-header-action-menus">
					<div class="ui basic icon buttons">
						<button class="ui button" data-tooltip="修改信息"  data-position="bottom center"><i class="edit icon"></i></button>
						<button class="ui button" data-tooltip="更换密码"  data-position="bottom center"><i class="lock icon"></i></button>
						<button class="ui button" data-tooltip="我的消息"  data-position="bottom center"><i class="envelope icon"></i></button>
						<button class="ui button" data-tooltip="退出登录"  data-position="bottom center"><i class="sign out alternate icon"></i></button>
					</div>
				</div>
				
			</div>
		</div>
	
  </div>
</div>
<div class="ui bottom attached segment">
  <p></p>
</div>
  `
});
