//Основний модуль
import gulp from "gulp";

//Імпорт Путей
import { path } from "./gulp/config/path.js";

//Імпорт Плагинов
import { plugins} from "./gulp/config/plugins.js"

//передаєм Значеня в Глобальну переменуу
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
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive }      from "./gulp/tasks/svgSprive.js";

//Спостереженя Змін в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}
export { svgSprive }

//Последовательная обработка шрифтов, 
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основные задачи
// const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js,images));
const mainTask = gulp.series(copy, html, scss, js,images);

//Постройка Сценарію виконаня задач
const dev = gulp.series(reset, mainTask,  gulp.parallel(watcher,server));
const build = gulp.series(reset,mainTask);

//Експорт Сценаріїв
export { dev }
export { build }

//Виконання Сценарію за замовчуванням
gulp.task('default', dev);



