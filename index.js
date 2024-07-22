//Импорт модулей
const express = require('express');
const fs = require('fs');
const path = require('path');
//Создание сервера. Создается экземпляр приложения Express
const app = express();
// Определение порта: Устанавливается порт для запуска сервера.
const port = 3000;
// Путь к файлу для сохранения счетчика
const counterFile = path.join(__dirname,'counter.json');
// Функция для чтения счетчика из файла
function readCounter() {
  try {
    const data = fs.readFileSync(counterFile);
    return JSON.parse(data);
  } catch (err) {
    // Если файла нет, создаем его и возвращаем 0
    return {
        '/':0,
        '/about':0,
    };
  }
}
// Функция для записи счетчика в файл
function writeCounter(counter) {
  fs.writeFileSync(counterFile, JSON.stringify(counter));
}
//Загрузка данных при запуске
let counter = readCounter();
// Обработчик для главной страницы 
app.get('/', (req, res) => {
  counter['/']++;
  writeCounter(counter);
  res.send(`<h1>Главная страница</h1>
    <a href="/about">Перейти на страницу /about</a><p>Просмотров: ${counter['/']}</p>`);
});
// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
  counter['/about']++;
  writeCounter(counter);
  res.send(`<h1>О нас</h1>
    <a href="/">Перейти на страницу /</a><p>Просмотров: ${counter['/about']}</p>`);
});
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});