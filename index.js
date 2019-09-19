const express = require('express');
const scrapper = require('./scrapper');

const app = express();
const port = process.env.PORT || 3000;
const node_env = process.env.NODE_ENV || 'dev'

app.get('/', (req, res) => {
  scrapper.scrapper().then(result => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Port: ${port}`);
  console.log(`ENV: ${node_env}`)
});