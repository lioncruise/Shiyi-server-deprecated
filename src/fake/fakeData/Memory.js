'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const memories = [];

//前10用户的相册，每个相册增加3条记忆
//相册编号为1~30
for (let i = 1; i <= 10; i++) {
  let UserId = i;
  for (let j = 1; j <= 3; j++) {
    let AlbumId = 10 * (i - 1) + j;
    for (let k = 1; k <= 3; k++) {
      memories.push({
        content: chance.sentence(),
        gps: chance.coordinates(),
        positon: chance.city(),
        UserId,
        AlbumId,
      });
    }
  }
}

//共90条记忆
exports.data = memories;
