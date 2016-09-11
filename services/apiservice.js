/**
 * API SERVICE
 * Usage:
 * var x = ApiService.makeRequest("http://google.com", "123");
 * x.then(function (res) {
 *   console.log(res);
 * }, function (err) {
 *     console.log(err);
 * });
 */

var Q = require('q');
var request = require('superagent');
var logger = require('superagent-logger');

var ApiService =  {
  makeRequest: function (url, token, format) {
    var format = format || 'json';
    var lang = "en-gb";
    var deferred = Q.defer();

    url = url + "?token="+token + "&language=" + lang + "&format=" + format;
    request
      .get(url)
      .accept(format)
      //.query({'format': format})
      // .query({'token': token})
      // .query({'language': lang})
      //.use(logger)
      .end(function (err, resp) {
          if(err) {
            deferred.reject(err);
          }else {
            deferred.resolve(resp);
          }
      })
    return deferred.promise;
  }
};

module.exports = ApiService;