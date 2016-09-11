var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var controller = require('./controllers');
var TokenFactory = require('./factories').TokenFactory;
var app = express();
var TokenObj = null;
var tokenHash = '';
var config = require('./config.json');
var configEndpoints = config.api;


app.use(bodyParser.json());
//ToDo: need to check for expiry, default expiry is 7200ms
TokenObj = new TokenFactory(
    config.token.username,
    config.token.password,
    config.token.url
);
TokenObj.init();
TokenObj.get(function (token) {
  tokenHash = token;
});


app.get('/', function(req, res) {
  res.send("No fish!!");
});

app.post('/', function(req, res){
    var obj = req.body;
    //symptoms only
    var url = config.api.baseUrl + config.api.endpoints.loadSymptoms;
    controller.call({
        url: url,
        token: tokenHash,
        success: function (data) {
                    console.log('success');
                    res.json(data.body);
                  },
        fail:    function () {
                    res.status(500).send('Error in getting api response from Apimedic');
                  },
        params: obj
      });
});
console.log('::::::::: Started Listening to 0.0.0.0:10090  :::::::::::::');
http.createServer(app).listen(10090);
