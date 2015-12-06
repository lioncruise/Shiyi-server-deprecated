'use strict';

var utils = require('./utils');
var httpManager = require('./httpManager');

function getPushMsgResult(url, Appkey, masterSecret, taskId, callback) {
  var str = masterSecret + 'action' + 'getPushMsgResult' + 'appkey' + Appkey + 'taskId' + taskId;
  var sign = utils.md5(str);
  var postData = {
    action: 'getPushMsgResult',
    appkey: Appkey,
    taskId: taskId,
    sign: sign
  };
  httpManager.post(url, postData, function(err, data) {  //返回一个JSON格式的数据
    callback && callback(err, data);
  });
}

