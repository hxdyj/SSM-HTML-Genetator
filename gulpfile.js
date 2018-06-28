const gulp = require('gulp')
const sass = require('gulp-sass')
const shelljs = require('shelljs')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
// 静态服务器
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './generate-output/html'
		}
	})
})
function compileSass() {
	gulp.src('src/genetation/html-template/0/src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('generate-output/html/css'))
}
gulp.task('compile', function() {
	shelljs.exec('cnpm start')
	compileSass()
	var watcher = gulp.watch('src/genetation/**/*.!(json)')
	watcher.on('change', function(event) {
		console.log('ReCompiled Temaplate....')
		shelljs.exec('cnpm start')
		compileSass()
		reload()
	})
})
// gulp.task('sass', ['compile'], () =>
// 	sass('src/genetation/html-template/0/src/scss/*.scss')
// 		.on('error', sass.logError)
// 		.pipe(gulp.dest('generate-output/html/css'))
// );

gulp.task('default', ['compile', 'browser-sync'])
