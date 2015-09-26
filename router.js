'use strict';

var compose = require('koa-compose');
var Resource = require('koa-resource-router');
var router = require('koa-router')();
var middlewares = require('./middlewares');

var usersController = require('./controllers/restful/users');
var users = new Resource('users', middlewares.auth, usersController, {
  id: 'id'
});

var albumsController = require('./controllers/restful/albums');
var albums = new Resource('albums', middlewares.auth, albumsController, {
  id: 'id'
});

var albumUsersController = require('./controllers/restful/albumUsers');
var albumUsers = new Resource('albumUsers', middlewares.auth, albumUsersController, {
  id: 'id'
});

var actionsController = require('./controllers/restful/actions');
var actions = new Resource('actions', middlewares.auth, actionsController, {
  id: 'id'
});

var messagesController = require('./controllers/restful/messages');
var messages = new Resource('messages', middlewares.auth, messagesController, {
  id: 'id'
});

var middlewaresArray = [router.routes(), users.middleware(), albums.middleware(), albumUsers.middleware(), actions.middleware(), messages.middleware()];

//TODO: 删除测试路由
router.post('/test', function*() {
  console.log('-----------------this.query--------------------');
  console.log(this.query);
  console.log('-----------------this.params--------------------');
  console.log(this.params);
  console.log('--------------this.request.body-----------------');
  console.log(this.request.body);
  console.log('--------------this.request.files-----------------');
  console.log(this.request.files);

  this.body = '成功';
});

exports.router = router;
exports.serverRouter = compose(middlewaresArray);