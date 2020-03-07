var express = require('express');
var users = require('./users');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('login-register');   
});

router.post('/', function (req, res, next) {
  var user = users.filter(it => it.username == req.body.username);
  if (user === undefined || user.length == 0) {
    res.redirect("/register?username=" + req.body.username);
    return;
  }
  res.render('login-register', {
    error: 'The username already exists'
  });
});

module.exports = router;
