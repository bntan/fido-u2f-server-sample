var express = require('express');
var u2f = require("u2f");
var users = require('./users');
var router = express.Router();
var app = express();

router.get('/', function (req, res, next) {
  var session = u2f.request(getAppID(req));
  app.set("session", JSON.stringify(session));
  res.render('register', {
    username: req.query.username,
    challenge: session.challenge
  });
});

router.post('/', function (req, res, next) {
  console.log("FIDO Register Response");
  console.log("  registrationData: " + req.body.registrationData);
  console.log("  challenge: " + req.body.challenge);
  console.log("  version: " + req.body.version);
  console.log("  clientData: " + req.body.clientData);
  var result = u2f.checkRegistration(JSON.parse(app.get("session")), req.body);
  if(!result.successful) {
    res.end("/result?type=register&status=KO&error_code=" + result.errorCode + "&error_message=" + result.errorMessage);
    return;
  }
  console.log("  keyHandle: " + result.keyHandle);
  console.log("  publicKey: " + result.publicKey);
  users.push({username: req.body.username, keyHandle: result.keyHandle, publicKey: result.publicKey});
  res.end("/result?type=register&status=OK&keyHandle=" + result.keyHandle + "&publicKey=" + result.publicKey);
});

module.exports = router;

function getAppID(req) {
  return req.protocol + '://' + req.get('host');
}
