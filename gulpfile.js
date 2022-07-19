//Основний модуль
import gulp from "gulp";

//Імпорт Маршрутів
import { path } from "./gulp/config/path.js";

//Імпорт Плагинов
import { plugins} from "./gulp/config/plugins.js"

//передаєм в Глобальну переменуу
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins
}

//Імпорт Задач
import { copy }      from "./gulp/tasks/copy.js";
import { reset }     from "./gulp/tasks/reset.js";
import { html }      from "./gulp/tasks/html.js";
import { server }    from "./gulp/tasks/server.js";
import { scss }      from "./gulp/tasks/scss.js";
import { js }        from "./gulp/tasks/js.js";
import { images }    from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip }       from "./gulp/tasks/zip.js";
import { ftp }       from "./gulp/tasks/ftp.js";

//Спостереженя Змін в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html); //gulp.series(html,ftp); вигрузка на серв при зміні файла
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}
export { svgSprive }

//Послідовна обробка шрифтов, 
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основні задачи
const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js,images));

//Постройка Сценарію виконаня задач
const dev = gulp.series(reset, mainTask,  gulp.parallel(watcher,server));
const build = gulp.series(reset,mainTask);
const deployZIP = gulp.series(reset,mainTask, zip);
const deployFTP = gulp.series(reset,mainTask, ftp);


//Експорт Сценаріїв
export { fonts }
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

//Виконання Сценарію за замовчуванням
gulp.task('default', dev);



