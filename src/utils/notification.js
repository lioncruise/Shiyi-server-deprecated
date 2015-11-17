'use strict';

var config = require('../config');
var urllib = require('urllib');
var debug = require('debug')('utils/notification');
var apns = require('apns');
// var AnroideNotificationTemplate = require('./getui/template/NotificationTemplate');

exports.sendNotification = function*(UserId, content) {
  debug('send notification "' + content + '" to user ' + UserId);
  //TODO
};

exports.sendIOSNotification = function*(iphone_token, content) {
  //TODO
  var connection = new apns.Connection(config.IOSNotification);

  var notification = new apns.Notification();
  notification.payload = {
    "description": "A good news !"
  };
  notification.badge = 1;
  notification.device = new apns.Device(iphone_token);
  notification.alert = content;

  connection.sendNotification(notification);
};

exports.sendAndroidNotification = function*(android_token, title, content) {
  //TODO
  // var notification = new AnroideNotificationTemplate({
  //   appId: config.AndroidNotification.appId,
  //   appKey: config.AndroidNotification.appKey,
  //   title: title,
  //   text: content,
  //   logo: config.AndroidNotification.logo,
  //   isRing: true,
  //   isVibrate: true,
  //   isClearable: true
  // });
};