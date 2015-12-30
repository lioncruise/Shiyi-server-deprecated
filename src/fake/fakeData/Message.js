'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const messages = [{
  type: 'message',
  UserId: 1,
  TargetUserId: 2,
  content: 'Hello world!',
}, {
  type: 'message',
  UserId: 2,
  TargetUserId: 1,
  content: 'PHP is the best language!',
}, {
  type: 'message',
  UserId: 1,
  TargetUserId: 7,
  content: '1 你好',
  createdAt: moment().subtract(20, 'minutes'),
}, {
  type: 'message',
  UserId: 7,
  TargetUserId: 1,
  content: '2 你好，你是谁啊',
  createdAt: moment().subtract(18, 'minutes'),
}, {
  type: 'message',
  UserId: 1,
  TargetUserId: 7,
  content: '3 你怎么把我忘了呢',
  createdAt: moment().subtract(16, 'minutes'),
}, {
  type: 'message',
  UserId: 1,
  TargetUserId: 7,
  content: '4 你想想你的初中同学',
  createdAt: moment().subtract(14, 'minutes'),
}, {
  type: 'message',
  UserId: 7,
  TargetUserId: 1,
  content: '5 哦，你是小王吧',
  createdAt: moment().subtract(12, 'minutes'),
}, {
  type: 'message',
  UserId: 7,
  TargetUserId: 1,
  content: '6 当时坐在我后桌的小王',
  createdAt: moment().subtract(10, 'minutes'),
}, {
  type: 'message',
  UserId: 1,
  TargetUserId: 7,
  content: '7 对，我就是小王',
  createdAt: moment().subtract(8, 'minutes'),
}, {
  type: 'message',
  UserId: 7,
  TargetUserId: 1,
  content: '8 小王，我最近手头有点紧，能借我点钱么',
  createdAt: moment().subtract(6, 'minutes'),
}, {
  type: 'message',
  UserId: 1,
  TargetUserId: 7,
  content: '9 ……',
  createdAt: moment().subtract(4, 'minutes'),
},
];

exports.data = messages;
