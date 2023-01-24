export const libCss = () => {
	return app.gulp.src( [
			'node_modules/slick-carousel/slick/slick.scss',
			'node_modules/normalize.css/normalize.css',
			'node_modules/magnific-popup/dist/magnific-popup.css'
		] )
		.pipe( app.plugins.concat( '_lib.scss' ) )
		.pipe( app.gulp.dest( 'src/scss' ) )
		.pipe( app.plugins.browsersync.stream() );
	
	
}