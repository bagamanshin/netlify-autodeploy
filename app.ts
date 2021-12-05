const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

// @ts-ignore
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/', 'index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server has started on ${PORT} port!`);
});
