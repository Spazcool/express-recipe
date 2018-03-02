const express = require('express');
const session = require('cookie-session');
// const bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const routing = require('./routing');
const app = express();
app.use(express.static('public'));

// Set directory to contain the templates ('views')
// app.set('views', path.join(__dirname, 'views'));

// Set view engine to use, in this case 'some_template_engine_name'
app.set('view engine', 'ejs');
// COOKIES
app.use(session({secret: 'onlymyrecipes'}))

// CREATE EMPTY ARRAY
.use((req, res, next) => {
  if (typeof(req.session.recipes) == 'undefined') {
    req.session.recipes = [];
  }
  //all middleware here requires the next func to move on to the next middleware
  //i do wonder if it is requrird here, given that there isn't another one to follwo...
  next();
})

app.use('/', routing)

.use((req, res, next) => {
  res.redirect('/');
})

.listen(8080);
