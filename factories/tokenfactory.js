/**
 * Token Factory
 * Usage:
 * var token = new TokenFactory('xxx@yy.com', 'r8XKo46Atw2E7GmBa', 'https://sandbox-authservice.priaid.ch/login');
 * token.init();
 * token.get(function (tkn) {console.log(tkn);});
 */


var crypto = require('crypto');
var request = require('superagent');
var proto = null;


function TokenFactory(username, password, authServiceUrl) {
  this.username = username;
  this.password = password;
  this.authServiceUrl = authServiceUrl;
  this.header = {};
  this.token = "";
}

proto = TokenFactory.prototype;

proto.init = function () {
  var hmac = crypto.createHmac('md5', this.password).update(this.authServiceUrl).digest("base64");
  var auth_header = 'Bearer ' + this.username + ':' + hmac;
  this.updateHeader('Authorization', auth_header);
  this.updateHeader('Content-Type', 'application/json');
  this.updateHeader('Accept', 'application/json, text/plain, */*');
  this.updateHeader('Accept-Language', 'en-US,en;q=0.8');
}

proto.updateHeader = function (key, value) {
  this.header[key] = value;
}

proto.get = function (clbk) {
  var self = this;
  if(!this.token) {
      request
        .post(this.authServiceUrl)
        .set(this.header)
        .end(function (err, res) {
            if(!err) {
              self.token = res.body.Token;
              clbk(self.token);
            }

        });
        return;
  }

  //return cached token
  clbk(this.token);


};

module.exports = TokenFactory;
