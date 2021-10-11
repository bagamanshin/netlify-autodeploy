// Express уже установлен, можно пользоваться
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/404/", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`);
});
