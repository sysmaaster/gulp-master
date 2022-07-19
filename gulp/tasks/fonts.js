import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    //шукаєм файли щрифта ,otf
    return app.gulp.src(`${app.path.src.fonts}*.otf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title:"FONTS",
            message: "Error: <%= error.message %>"
        })
    ))
    
    //конвертуєм   в ttf
    .pipe(fonter({
        formats: ['ttf']
    }))
    //вигружаєм в початкову папку
    .pipe(app.gulp.dest(`${app.path.src.fonts}`))
}
export const ttfToWoff = () => {
    //шукаєм файли щрифта ,ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title:"FONTS",
            message: "Error: <%= error.message %>"
        })
    ))
    //конвертуєм   в ,woff
    .pipe(fonter({
        formats: ['woff']
    }))
//вигружаєм в папку з  результатом
    .pipe(app.gulp.dest(app.path.build.fonts))
//шукаєм файли щрифта ,woff2
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
//конвертуєм   в ,woff2
    .pipe(ttf2woff2())
//вигружаєм в папку з  результатом
    .pipe(app.gulp.dest(app.path.build.fonts))
}
export const fontsStyle = () => {
//Подключение шрифтов в файл стилей css
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // Проверяем существует ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
       if (fontsFiles) {
          // Проверяем существует ли файл стилей для подключения шрифтов
          if (!fs.existsSync(fontsFile)) {
             //Если файла нет, то создаем его
             fs.writeFile(fontsFile, '', cb);
             let newFileOnly;
             for (let i = 0; i < fontsFiles.length; i++) {
                //Записываем подключение шрифтов в файл стилей
                let fontFileName = fontsFiles[i].split('.')[0];
                if (newFileOnly !== fontFileName) {
                   let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                   let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                   if (fontWeight.toLowerCase() === 'thin') {
                      fontWeight = 100;
                   } else if (fontWeight.toLowerCase() === 'extralight') {
                      fontWeight = 200;
                   } else if (fontWeight.toLowerCase() === 'light') {
                      fontWeight = 300;
                   } else if (fontWeight.toLowerCase() === 'medium') {
                      fontWeight = 500;
                   } else if (fontWeight.toLowerCase() === 'semibold') {
                      fontWeight = 600;
                   } else if (fontWeight.toLowerCase() === 'bold') {
                      fontWeight = 700;
                   } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                      fontWeight = 800;
                   } else if (fontWeight.toLowerCase() === 'black') {
                      fontWeight = 900;
                   } else {
                      fontWeight = 400;
                   }
                   fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                   //
                   newFileOnly = fontFileName;
                }
             }
          } else {
             //Если файл есть, то выводим сообщение
             console.log('Файл scss/fonts.scss уже существует.Для обновления нужно его удалить');
          }
       }
    });
 
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
 }