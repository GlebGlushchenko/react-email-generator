import { render } from "@react-email/components";
import MyTemplate from '../template/my.template.js';
import fs from 'fs';

const emailHTML = render(MyTemplate(1000));

console.log(emailHTML);

try {
  fs.writeFileSync("./dist/src/index.html", emailHTML);
  console.log("Файл успешно записан.");
} catch (err) {
  console.error("Ошибка при записи файла:", err);
}