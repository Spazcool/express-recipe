const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

// COOKIES
router.use(session({secret: 'onlymyrecipes'}))

// CREATE EMPTY ARRAY
.use((req, res, next) => {
  if (typeof(req.session.recipes) == 'undefined') {
    req.session.recipes = [];
  }
  next();
})

// VIEW HOME
.get('/', (req, res) => {
  res.render('home.ejs', {recipes: req.session.recipes, ingredients: req.session.ingredients});
})

// ADD ITEM
.post('/add/', urlencodedParser, (req, res) => {
  if (req.body.newrecipe == '') {
    req.session.recipes.push({recipe: 'No description.', ingredients: req.body.newingredients});
  }else{
    req.session.recipes.push({recipe: req.body.newrecipe, ingredients: req.body.newingredients});
  }
  res.redirect('/');
})

// DELETE ITEM
.get('/delete/:id', (req, res) => {
  if (req.params.id != '') {
    req.session.recipes.splice(req.params.id, 1);
  }
  res.redirect('/');
})

// MODIFY ITEM DETAILS
.get('/update/:id', (req, res) => {
  // req.session.recipes[req.params.id].update ? req.session.recipes[req.params.id].update = false : req.session.recipes[req.params.id].update = true;
  res.redirect('/');
})

module.exports = router;
