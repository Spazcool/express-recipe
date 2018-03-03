const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();

router.use(session({secret: 'onlymyrecipes'}))

.use((req, res, next) => {
  if (typeof(req.session.recipes) == 'undefined') {
    req.session.recipes = [];
  }
  next();
})

.get('/', (req, res) => {
  res.render('home.ejs', {
    recipes: req.session.recipes
  });
})

.get('/recipe/:id', (req, res) => {
  res.render('update.ejs', {
    id: req.params.id,
    recipe: req.session.recipes[req.params.id].recipe,
    ingredients: req.session.recipes[req.params.id].ingredients,
    directions: req.session.recipes[req.params.id].directions
  });
})

.post('/add/', urlencodedParser, (req, res) => {
  if (req.body.newrecipe == '') {
    req.session.recipes.push({
      recipe: 'No description.',
      ingredients: 'No description.',
      directions: 'No description.'
    });
  }else{
    req.session.recipes.push({
      recipe: req.body.newrecipe,
      ingredients: req.body.newingredients,
      directions: req.body.newdirections
    });
  }
  res.redirect('/');
})

.post('/update/:id', urlencodedParser, (req, res) => {
  req.session.recipes[req.params.id].recipe = req.body.newername;
  req.session.recipes[req.params.id].ingredients = req.body.neweringredients;
  req.session.recipes[req.params.id].directions = req.body.newerdirections;
  res.redirect('/');
})

.get('/delete/:id', (req, res) => {
  if (req.params.id != '') {
    req.session.recipes.splice(req.params.id, 1);
  }
  res.redirect('/');
})

module.exports = router;
