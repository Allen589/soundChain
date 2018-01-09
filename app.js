const blockChain = require('./blockChain.js');
const Block = require('./Block.js');
const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');
const mongojs = require('mongojs');
var db = mongojs('soundChain', ['users']);
var app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Global Vars
app.use(function(req, res, next) {
  res.locals.errors = null;
  next();
});

// Express Validator Middleware
app.use(expressValidator());

app.get('/', function(req, res) {
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Blocks',
      users: docs
    });
  })
});

app.post('/users/add', function(req, res) {

  req.checkBody('first_name', 'First Name is required').notEmpty();
  req.checkBody('last_name', 'Last Name is required').notEmpty();
  req.checkBody('block', 'block is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('index', {
      title: 'Blocks',
      users: users,
      errors: errors
    });
  } else {
    var newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        block: req.body.block
    }
    db.users.insert(newUser, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  }
});



app.listen(3000, function() {
  console.log('Server started on port 3000');
});
