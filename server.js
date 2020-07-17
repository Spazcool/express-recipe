const express = require('express');
const routing = require('./routing');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/', routing)

.use((req, res, next) => {
  res.redirect('/');
})

.listen(8080);
