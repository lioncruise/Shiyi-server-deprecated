'use strict';

var db = require('../db');
var debug = require('debug')('fake/users');

var users = [];

users.push({
  phone: '13000000000',
  password: '123456',
  gender: 'M',
  motto: 'Just do it.'
});

users.push({
  phone: '15000000000',
  password: '123456',
  gender: 'F',
  motto: 'I love books.'
});

module.exports = function*() {
  yield users.map(function(user) {
    return db.models.User.create(user);
  });
  debug('users data fake finish.');
};

module.exports.fakeUsers = users;