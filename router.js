'use strict';

var compose = require('koa-compose');
var Resource = require('koa-resource-router');
var router = require('koa-router')();

var usersController = require('./controllers/restful/users');

var users = new Resource('users', usersController);

var middlewaresArray = [router.routes(), users.middleware()];

exports.router = router;
exports.serverRouter = compose(middlewaresArray);