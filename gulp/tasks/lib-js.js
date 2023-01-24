export const libJs = () => {
	return app.gulp.src( [
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
		] )
		.pipe( app.plugins.concat( 'libs.min.js' ) )
		//.pipe(app.gulp.dest('src/js/modules'))
		.pipe( app.plugins.uglify() )
		.pipe( app.gulp.dest( app.path.build.js ) )
		.pipe( app.plugins.browsersync.stream() );
}