import replace from "gulp-replace"; //пошук та Заміна
import plumber from "gulp-plumber"; // Обробка Помилок
import notify from "gulp-notify";   //Повідомлення(підказки)
import browsersync from "browser-sync"; // Синхронізація Браузера
import newer from 'gulp-newer'; //перевірка Оновлень
import ifPiugin from 'gulp-if';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

//Створюємо Теку з плагінами
export const plugins = {
	newer: newer,
	if: ifPiugin,
	concat: concat,
	notify: notify,
	uglify: uglify,
	plumber: plumber,
	replace: replace,
	browsersync: browsersync,
}