import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename'

import cleanCss from 'gulp-clean-css'   //zip libCss
import webpcss from 'gulp-webpcss'      // вивід  webp картинок
import autoprefixer from 'gulp-autoprefixer' // добавлення вендорний префіксів
import groupCssMediaQueries from 'gulp-group-css-media-queries' // Групування Медіазапитів


const sass = gulpSass( dartSass );


export const scss = () => {
	return app.gulp.src( app.path.src.scss, { sourcemaps: app.isDev } )
		.pipe( app.plugins.plumber(
			app.plugins.notify.onError( {
				title: "SCSS",
				message: "Error: <%= error.message %>"
			} )
		) )
		.pipe( app.plugins.replace( /@img\//g, "../img/" ) )
		.pipe( sass( {
			outputStyle: 'expanded' //expanded or compressed
		} ) )
		.pipe(
			app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp",
                })
            )
        )
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer( {
					grid: true,
					overrideBrovserslist: [ "last 3 versions" ],
					cascade: true
				} )
			)
		)
		
		//не сжатий дубль файл стилів
		.pipe( app.plugins.if( app.isDev, app.gulp.dest( app.path.build.css ) ) )
		.pipe( app.plugins.if( app.isBuild, cleanCss() ) )
		.pipe( rename( { extname: ".min.css" } ) )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}