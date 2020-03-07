var express = require('express');
var users = require('./users');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('login-sign');  
});

router.post('/', function (req, res, next) {
  var user = users.filter(it => it.username == req.body.username);
  if (user === undefined || user.length == 0) {
    res.render('login-sign', {
      error: 'The username does not exist'
    });
    return;
  }
  var keyHandle = user[0].keyHandle;
  var publicKey = user[0].publicKey;
  res.redirect("/sign?keyHandle=" + keyHandle + "&publicKey=" + publicKey);
});

module.exports = router;
