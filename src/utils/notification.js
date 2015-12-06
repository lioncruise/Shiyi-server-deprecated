'use strict';

const config = require('../config');
const GeTui = require('../../lib/getui/GT.push');
const Target = require('./getui/Target');

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

const SingleMessage = require('../../lib/getui/message/SingleMessage');
const AppMessage = require('../../lib/getui/message/AppMessage');
const ListMessage = require('../../lib/getui/message/ListMessage');

// http的域名
// var HOST = 'http://sdk.open.api.igexin.com/apiex.htm';

// https的域名
var HOST = 'https://api.getui.com/apiex.htm';

//Android用户测试
var APPID = '';
var APPKEY = '';
var MASTERSECRET = '';

exports.sendNotification = function*(UserId, content) {
  var push = new IGtPush(ip, appkey,masterSecret);

};
