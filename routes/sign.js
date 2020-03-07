var express = require('express');
var u2f = require("u2f");
var router = express.Router();
var app = express();

router.get('/', function (req, res, next) {
  var session = u2f.request(getAppID(req), req.query.keyHandle);
  app.set("session", JSON.stringify(session));
  res.render('sign', {
    keyHandle: req.query.keyHandle,
    publicKey: req.query.publicKey,
    challenge: session.challenge
  });
});

router.post('/', function (req, res, next) {
  console.log("FIDO Signature Response");
  console.log("  keyHandle: " + req.body.keyHandle);
  console.log("  clientData: " + req.body.clientData);
  console.log("  signatureData: " + req.body.signatureData);
  console.log("  publicKey: " + req.body.publicKey);
  var result = u2f.checkSignature(JSON.parse(app.get("session")), req.body, req.body.publicKey);
  if(!result.successful) {
    res.end("/result?type=sign&status=KO&error_code=" + result.errorCode + "&error_message=" + result.errorMessage);
    return;
  }
  console.log("  userPresent: " + result.userPresent);
  console.log("  counter: " + result.counter);
  res.end("/result?type=sign&status=OK&userPresent=" + result.userPresent + "&counter=" + result.counter);
});

module.exports = router;

function getAppID(req) {
  return req.protocol + '://' + req.get('host');
}