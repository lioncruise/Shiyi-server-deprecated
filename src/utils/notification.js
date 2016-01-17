'use strict';

const config = require('../config');
const GeTui = require('../../lib/getui/GT.push');
const Target = require('../../lib/getui/Target');

const APNTemplate = require('../../lib/getui/template/APNTemplate');
const BaseTemplate = require('../../lib/getui/template/BaseTemplate');
const APNPayload = require('../../lib/getui/payload/APNPayload');
const DictionaryAlertMsg = require('../../lib/getui/payload/DictionaryAlertMsg');
const SimpleAlertMsg = require('../../lib/getui/payload/SimpleAlertMsg');
const NotyPopLoadTemplate = require('../../lib/getui/template/NotyPopLoadTemplate');
const LinkTemplate = require('../../lib/getui/template/LinkTemplate');
const NotificationTemplate = require('../../lib/getui/template/NotificationTemplate');
const PopupTransmissionTemplate = require('../../lib/getui/template/PopupTransmissionTemplate');
const TransmissionTemplate = require('../../lib/getui/template/TransmissionTemplate');
const RequestError = require('../../lib/getui/RequestError');

const SingleMessage = require('../../lib/getui/message/SingleMessage');
const AppMessage = require('../../lib/getui/message/AppMessage');
const ListMessage = require('../../lib/getui/message/ListMessage');

const { host:HOST, appId:APPID, appKey:APPKEY, masterSecret:MASTERSECRET, logo:LOGO } = config.getui;
let gt = null;

exports.notificationInit = function() {
  gt = new GeTui(HOST, APPKEY, MASTERSECRET);
};

const NotificationTemplateForMoreOptions = function(title, text, withIOS = false) {
  let template = new NotificationTemplate({
    appId: APPID,
    appKey: APPKEY,
    title: title,
    text: text,
    logo: LOGO,
    isRing: true,
    isVibrate: true,
    isClearable: false,
    transmissionType: 2,
    transmissionContent: 'transmissionContent',
  });
  if (withIOS) {
    // iOS推送需要设置的pushInfo字段
    let payload = new APNPayload();
    let alertMsg = new DictionaryAlertMsg();
    alertMsg.body = text;

    //ios8.2以上版本支持
    alertMsg.title = title;

    payload.badge = 5;
    template.setApnInfo(payload);
  }

  return template;
};

const constructMessage = function(title, text, MessageClass) {
  let template = new NotificationTemplate({  //设置推送消息类型，默认通知类消息
    appId: APPID,
    appKey: APPKEY,
    title: title,
    text: text,
    logo: LOGO,
  });
  let messageConfig = {
    isOffline: config.getui.isOffLine,
    offlineExpireTime: config.getui.offlineExpireTime,
    data: template,
  };
  if (MessageClass === AppMessage) {
    messageConfig.appIdList = [APPID];
    messageConfig.speed = 40;
  }

  return new MessageClass(messageConfig);
};

const sendNotificationToAppCb = function(title, text, cb) {
  let taskGroupName = null;
  let message = constructMessage(title, text, AppMessage);
  gt.connect(function() {
    gt.pushMessageToApp(message, taskGroupName, cb);
  });
};

const sendNotificationToSingleCb = function(title, text, cid, cb) {
  let message = constructMessage(title, text, SingleMessage);
  let target = new Target({ appId: APPID, clientId: cid });
  gt.connect(function() {
    gt.pushMessageToSingle(message, target, function(err, res) {
      if (err !== null && err.exception !== null && err.exception instanceof  RequestError) {
        let requestId = err.exception.requestId;
        gt.pushMessageToSingle(message, target, requestId, cb);
      }else {
        cb(err, res);
      }
    });
  });
};

const sendNotificationToListCb = function(title, text, cidList, cb) {
  let taskGroupName = null;
  let message = constructMessage(title, text, ListMessage);
  let targetList = cidList.map(function(cid) {
    return new Target({ appId: APPID, clientId:cid });
  });

  gt.getContentId(message, taskGroupName, function(err, res) {
    let contentId = res;
    gt.needDetails = true;
    gt.pushMessageToList(contentId, targetList, cb);
  });
};

exports.sendNotificationToApp = function(title, text) {
  return function(cb) {
    sendNotificationToAppCb(title, text, cb);
  };
};

exports.sendNotificationToSingle = function(title, text, cid) {
  return function(cb) {
    sendNotificationToSingleCb(title, text, cid, cb);
  };
};

exports.sendNotificationToList = function(title, text, cidList) {
  return function(cb) {
    sendNotificationToListCb(title, text, cidList, cb);
  };
};

