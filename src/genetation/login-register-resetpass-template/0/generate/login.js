
module.exports = {
	writeToFile(line, isReWrite) {
		let fileName =
			config.generateDirs.html + 'login.' + config.html.file_suffix;
		file_utils.writeLineToFile(line, fileName, isReWrite);
	},
	writeToFiles(commonData) {
		/* -------  Start ------- */

		this.writeToFile(`
<!DOCTYPE html>
<html>

<head>
	<!-- Standard Meta -->
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

	<!-- Site Properties -->
	<title>Login Example - Semantic</title>
	<link rel="stylesheet" type="text/css" href="./js/semantic.min.css">
	<script src="./js/jquery.min.js"></script>
	<script src="./js/config.js"></script>
	<script src="./js/semantic.min.js"></script>
	<script src="./js/vue.min.js"></script>

	<style type="text/css">
	body {
		background-color: #5AB9E0;
	}

	body>.grid {
		height: 100%;
	}

	.image {
		margin-top: -100px;
	}

	.column {
		max-width: 450px;
	}
	</style>

</head>

<body>

	<div class="ui middle aligned center aligned grid" id="app">
	<div class="column">
		<h2 class="ui teal image header">
		<div class="content" style="color: white">
			Login System
		</div>
		</h2>
		<div class="ui large form">
		<div class="ui stacked segment">`, true);


		debugger
		/* -------  END ------- */
	}
};
