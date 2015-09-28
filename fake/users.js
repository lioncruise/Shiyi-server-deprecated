'use strict';

var db = require('../db');
var debug = require('debug')('fake/users');
var utility = require('utility');

var users = [];

users.push({
  phone: '13000000000',
  password: utility.md5('123456'),
  gender: 'M',
  motto: 'Just do it.'
});

users.push({
  phone: '13000000001',
  password: utility.md5('123456'),
  gender: 'F',
  motto: 'I love book 1.'
});

users.push({
  phone: '13000000002',
  password: utility.md5('123456'),
  gender: 'F',
  motto: 'I love book 2.'
});

users.push({
  phone: '13000000003',
  password: utility.md5('123456'),
  gender: 'F',
  motto: 'I love book 3.'
});

users.push({
  phone: '13000000004',
  password: utility.md5('123456'),
  gender: 'F',
  motto: 'I love book 4.'
});

exports.fake = function*() {
  yield users.map(function(user) {
    return db.models.User.create(user);
  });
  debug('users data fake finish.');
};

exports.fakeData = users;