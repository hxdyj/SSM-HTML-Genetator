var gulp = require('gulp');
var shelljs = require('shelljs');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// 静态服务器
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./generate-output/html"
		}
	});
});

gulp.task('compile', function () {
	var watcher = gulp.watch('src/genetation/**');
	watcher.on('change', function (event) {
		console.log('ReCompiled Temaplate....')
		shelljs.exec('cnpm start')
		reload()
	});
});

gulp.task('default', ['compile', 'browser-sync']);
