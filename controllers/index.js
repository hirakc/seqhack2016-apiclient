var service = require('../services').ApiService;
var diagnosticCtrl = require('./diagnosticcontroller');

function generic_api_call(options) {
  if(!options || (!options.url && !options.token)) return;
  var fn = function () {},
      url = options.url,
      token = options.token,
      successClbk = options.success || fn,
      failureClbk = options.fail || fn,
      params = options.params || false;

//hack (symptoms by bodysublocation)
  url = url + "/0/" + (params.gender == 'male'? 'man' : 'woman');
  service
    .makeRequest(url, token)
    .then(successClbk, failureClbk);
}


exports.call = generic_api_call;