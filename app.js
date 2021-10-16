const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/404/", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT} port!`);
});
