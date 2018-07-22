const 	gulp = require('gulp'),
		watch = require('gulp-watch'),
		postcss = require('gulp-postcss'),
		autoprefix = require('autoprefixer'),
		cssvars = require('postcss-simple-vars'),
		nested = require('postcss-nested'),
		cssImport = require('postcss-import'),
		mixins = require('postcss-mixins'),
		cleancss = require('gulp-clean-css'),
		rename = require('gulp-rename'),
		plumber = require('gulp-plumber'),

		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		webpack = require('webpack');



gulp.task( 'styles', function() {

	return gulp.src('dist/css/style.css')
		.pipe( plumber() )
		.pipe( postcss( [ cssImport, mixins, cssvars, nested, autoprefix ] ))
		.pipe( cleancss({
			compatibility: 'ie8',
			debug: true
		}))
		.pipe( rename('style.min.css'))
		.pipe( gulp.dest('prod/css'))
});

gulp.task('webpack', function(cb) {
	webpack( require('./webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		cb();
	});
});



gulp.task( 'watch', function() {

	watch( './dist/css/**/*.css', function() {
		gulp.start('styles');
	});

	watch( ['./dist/js/modules/*.js', './dist/js/scripts.js'], function() {
		gulp.start('webpack');
	});

});

gulp.task( 'default', ['styles', 'webpack', 'watch'] );