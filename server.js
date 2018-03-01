const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// COOKIES
app.use(session({secret: 'onlymyrecipes'}))

// CREATE EMPTY ARRAY
.use((req, res, next) => {
  if (typeof(req.session.recipes) == 'undefined') {
    req.session.recipes = [];
  }
  next();
})

// VIEW HOME
.get('/', (req, res) => {
  console.log(req.session.recipes);
  res.render('home.ejs', {recipes: req.session.recipes});
})

// ADD TICKET
.post('/add/', urlencodedParser, (req, res) => {
  if (req.body.newrecipe == '') {
    req.session.recipes.push({recipe: 'No description.'});
  }else{
    req.session.recipes.push({recipe: req.body.newrecipe});
  }
  res.redirect('/');
})

// DELETE TICKET
.get('/delete/:id', (req, res) => {
  if (req.params.id != '') {
    req.session.recipes.splice(req.params.id, 1);
  }
  res.redirect('/');
})

// MODIFY TICKET DETAILS
.get('/update/:id', (req, res) => {
  req.session.recipes[req.params.id].update ? req.session.recipes[req.params.id].update = false : req.session.recipes[req.params.id].update = true;
  res.redirect('/');
})

.use((req, res, next) => {
  res.redirect('/');
})

.listen(8080);
