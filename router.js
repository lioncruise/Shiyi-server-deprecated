'use strict';

var compose = require('koa-compose');
var Resource = require('koa-resource-router');
var router = require('koa-router')();
var middlewares = require('./middlewares');
var path = require('path');

//路由中间件数组
var middlewaresArray = [middlewares.auth, router.routes()];

//各restful路由
var controllerNames = ['users', 'albums', 'albumUsers', 'actions', 'messages', 'pictures', 'comments', 'likes'];
for (var i = 0; i < controllerNames.length; i++) {
  var name = controllerNames[i];
  var controller = require(path.join(__dirname, 'controllers/restful', name));
  middlewaresArray.push((new Resource(name, controller, {
    id: 'id'
  })).middleware());
}

//TODO: 删除测试路由
router.get('/', function*() {
  this.body = 'Everything looks good.';
});
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