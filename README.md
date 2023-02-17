# gulp-master install  Node.js - NPM

Node.js v18.x:
# Using Ubuntu 
- `curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - sudo apt-get install -y nodejs`
- `sudo apt instal npm -y`
- `npm install -g npm`
- `node -v`  v18.14.1
- `npm -v`   v9.5.0
- `npm i`

для віндовс виконати налаштування у файлі `gulp/tasks/fonts.js` розкрити строку `2 //import fonter from 'gulp-fonter'; //windows` видаляючи строку 3 - Лінукс

### Сценарії
  - ` dev ` 
  - ` build `
  - ` fonts `
  - ` deployZIP `
  - ` deployFTP `
  - ` svgSprive`
### Виконання Сценарію за замовчуванням  ` dev `
