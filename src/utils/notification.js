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

// https | http 的域名
const HOST = config.getui.host;

//Android用户测试
const APPID = config.getui.appId;
const APPKEY = config.getui.appKey;
const MASTERSECRET = config.getui.masterSecret;
const LOGO = config.getui.logo;
const gt = new GeTui(HOST, APPKEY, MASTERSECRET);

const NotificationTemplateForMoreOptions = function (title, text, withIOS = false) {
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
}

const sendNotificationToAppCb = function (title, text, cb) {
  let taskGroupName = null;
  let template = new NotificationTemplate({
    appId: APPID,
    appKey: APPKEY,
    title: title,
    text: text,
    logo: LOGO,
  });
  let message = new AppMessage({
    isOffline: true,
    offlineExpireTime: 3600 * 12 * 1000,
    data: template,
    appIdList: [APPID],
    speed: 40,
  });

  gt.connect(function () {
    gt.pushMessageToApp(message, taskGroupName, cb);
  });
};






exports.sendNotificationToApp = function(title, text) {
  return function (cb) {
    sendNotificationToAppCb(title, text, cb);
  };
};


