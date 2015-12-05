'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const reports = [];

//前3用户每人3个report，举报id是10-i的相关对象
for (let i = 1; i <= 3; i++) {
  let UserId = i;

  reports.push({
    content: '该人发黄图',
    UserId,
    TargetUserId: 10 - i,
  });
  reports.push({
    content: '黄图册',
    UserId,
    AlbumId: 10 - i,
  });
  reports.push({
    content: '传播诈骗信息',
    UserId,
    MemoryId: 10 - i,
  });
  reports.push({
    content: '黄图',
    UserId,
    PictureId: 10 - i,
  });

}

exports.data = reports;
