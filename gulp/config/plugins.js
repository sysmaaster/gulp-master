import replace from "gulp-replace"; //пошук та Заміна
import plumber from "gulp-plumber"; // Обробка Помилок
import notify from "gulp-notify";   //Повідомлення(підсказки)
import browsersync from "browser-sync"; // Синхронізація Браузера
import newer from 'gulp-newer'; //провірка Оновлень
import ifPiugin from 'gulp-if';

//Скворюєм Теку з  плагінами
export const plugins = {
    if: ifPiugin,
    newer:newer,
    notify:notify,
    plumber:plumber,
    replace: replace,
    browsersync:browsersync,
}