const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const shelljs = require('shelljs');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
// 静态服务器
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./generate-output/html"
		}
	});
});

gulp.task('compile', function () {
	shelljs.exec('cnpm start')
	var watcher = gulp.watch('src/genetation/**');
	watcher.on('change', function (event) {
		console.log('ReCompiled Temaplate....')
		shelljs.exec('cnpm start')
		gulp.task('sass')
		reload()
	});
});
gulp.task('sass', ['compile'], () =>
	sass('src/genetation/html-template/0/src/scss/*.scss')
		.on('error', sass.logError)
		.pipe(gulp.dest('generate-output/html/css'))
);

gulp.task('default', ['compile', 'browser-sync', 'sass']);
