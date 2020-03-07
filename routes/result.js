var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('result', {
    type: req.query.type,
    status: req.query.status,
    error_code: req.query.error_code,
    error_message: req.query.error_message,
    keyHandle: req.query.keyHandle,
    publicKey: req.query.publicKey,
    userPresent: req.query.userPresent,
    counter: req.query.counter
  });
});

module.exports = router;
