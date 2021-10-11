// Express уже установлен, можно пользоваться
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

// Здесь нужно написать роут для отдачи статики
// Все пути считаются относительно переменной __dirname
// Подробнее про __dirname можно прочитать здесь https://nodejs.org/api/modules.html#modules_dirname
// router.get("/", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "/dist/main/", "index.html"), {
//     dotfiles: "allow",
//   });
// });

app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`);
});
