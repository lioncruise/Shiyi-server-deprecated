'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const feedbacks = [];

//前3用户每人3个feedback
for (let i = 1; i <= 3; i++) {
  let UserId = i;

  feedbacks.push({
    content: '删除暴力色情资源',
    UserId,
  });
  feedbacks.push({
    content: '删除暴力色情资源',
    UserId,
  });
  feedbacks.push({
    content: '禁封骗子用户',
    UserId,
  });
}

exports.data = feedbacks;
