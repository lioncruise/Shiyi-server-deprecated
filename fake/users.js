'use strict';

var db = require('../db');
var debug = require('debug')('fake/users');

var users = [];

users.push({
  phone: '15000000000',
  password: '123456',
  gender: 'M',
  motto: 'Just do it.'
});

var insertsArray = users.map(function (user) {
  return db.models.User.create(user);
});

Promise.all(insertsArray).then(function () {
  debug('users data fake finish.');
});