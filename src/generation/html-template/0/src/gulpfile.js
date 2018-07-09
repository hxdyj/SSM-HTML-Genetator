const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
// 静态服务器
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})
})
function compileSass() {
	gulp
		.src('scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'))
}
gulp.task('compile', function() {
	compileSass()
	var watcher = gulp.watch('**/*')
	watcher.on('change', function(event) {
		console.log('reLoad....')
		compileSass()
		reload()
	})
})

gulp.task('default', ['compile', 'browser-sync'])
