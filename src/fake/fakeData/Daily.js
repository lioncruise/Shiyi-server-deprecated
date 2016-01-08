'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const dailies = [];

dailies.push({
  title: '1月1日 日报',
  description: '1月1日 日报',
  url: 'http://www.baidu.com',
  AlbumId: 2,
  UserId: 1,
});
dailies.push({
  title: '1月2日 日报',
  description: '1月2日 日报',
  url: 'http://www.baidu.com',
});
dailies.push({
  title: '1月3日 日报',
  description: '1月3日 日报',
  url: 'http://www.baidu.com',
});

exports.data = dailies;
