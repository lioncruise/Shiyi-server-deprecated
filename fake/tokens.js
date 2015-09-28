'use strict';

var db = require('../db');
var debug = require('debug')('fake/tokens');
var utility = require('utility');

var tokens = [];

tokens.push({
  phone: '13000777004',
  token: utility.md5('eeeee'),
  type: 'changePassword'
});

tokens.push({
  phone: '13000000001',
  token: utility.md5('eeeee'),
  type: 'register'
});

tokens.push({
  phone: '13000003301',
  token: utility.md5('eeeee'),
  type: 'register'
});

tokens.push({
  phone: '15555555550',
  token: utility.md5('eeeee'),
  type: 'register'
});

tokens.push({
  phone: '15555555551',
  token: utility.md5('eeeee'),
  type: 'changePassword'
});

exports.fake = function*() {
  yield tokens.map(function(token) {
    return db.models.Token.create(token);
  });
  debug('tokens data fake finish.');
};

exports.fakeData = tokens;