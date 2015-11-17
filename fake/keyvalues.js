'use strict';

var db = require('../src/db');
var debug = require('debug')('fake/keyvalues');

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

exports.fake = function*() {
  yield keyvalues.map(function(kv) {
    return db.models.Keyvalue.create(kv);
  });
  debug('keyvalues data fake finish.');
};

exports.fakeData = keyvalues;