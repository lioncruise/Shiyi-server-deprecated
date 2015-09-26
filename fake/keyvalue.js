'use strict';

var db = require('../db');
var debug = require('debug')('fake/keyvalue');

var keyvalues = [];

keyvalues.push({
  key: 'androidVersion',
  value: '0.0.1'
});

keyvalues.push({
  key: 'iosVersion',
  value: '0.0.1'
});

keyvalues.push({
  key: 'androidDownloadUrl',
  value: 'http://test.com'
});

keyvalues.push({
  key: 'iosDownloadUrl',
  value: 'http://test.com'
});

module.exports = function*() {
  yield keyvalues.map(function(kv) {
    return db.models.Keyvalue.create(kv);
  });
  debug('keyvalues data fake finish.');
};

module.exports.fakeKeyvalues = keyvalues;