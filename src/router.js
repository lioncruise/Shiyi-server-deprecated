'use strict';

const compose = require('koa-compose');
const Resource = require('koa-resource-router');
const router = require('koa-router')();
const middlewares = require('./middlewares');
const path = require('path');

//路由中间件数组
const middlewaresArray = [middlewares.auth, router.routes()];

//各restful路由
const restfulControllerNames = [
  'users', 'albums', 'memories', 'pictures',
  'albumUserCollaborates', 'albumUserFollows', 'userUserFollows',
  'comments', 'likes', 'messages',
];

for (const name of restfulControllerNames) {
  const controller = require(path.join(__dirname, 'controller/restful', name));
  middlewaresArray.push((new Resource(name, controller, {
    id: 'id',
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

  this.body = 'success';
});

exports.router = router;
exports.serverRouter = compose(middlewaresArray);
