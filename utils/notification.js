'use strict';

var config = require('../config');
var urllib = require('urllib');
var debug = require('debug')('utils/notification');
var apns = require('apns');

exports.sendNotification = function*(UserId, content) {
  debug('send notification "' + content + '" to user ' + UserId);
  //TODO
};

exports.sendIOSNotification = function*(iphone_token, content) {
  //TODO: 未测试
  var connection = new apns.Connection(config.apns);

  var notification = new apns.Notification();
  notification.payload = {
    "description": "A good news !"
  };
  notification.badge = 1;
  notification.device = new apns.Device(iphone_token);
  notification.alert = content;

  connection.sendNotification(notification);
};

exports.sendAndroidNotification = function*(android_token, content) {
  //TODO
};