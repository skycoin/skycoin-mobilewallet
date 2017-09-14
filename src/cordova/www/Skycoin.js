var exec = require('cordova/exec');

var Skycoin = {
  getAddresses: function(successCallback, errorCallback, args) {
    console.log('creating wallet');
    exec(successCallback, errorCallback, "Skycoin", "GetAddresses", args);
  },
  getBalances: function(successCallback, errorCallback, args) {
    console.log('creating address');
    exec(successCallback, errorCallback, "Skycoin", "GetBalances", args);
  },
  postTransaction: function(successCallback, errorCallback, args) {
    console.log('getting address in wallet');
    exec(successCallback, errorCallback, "Skycoin", "PostTransaction", args);
  },
};

module.exports = Skycoin;
