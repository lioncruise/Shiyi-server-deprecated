'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const like = [];

//4 5 6
for (let i = 1; i <= 10; i++) {
  const UserId = i;
  for (let j = 4; j <= 6; j++) {
    const MemoryId = j;
    like.push({
      type: 'smile',
      UserId,
      MemoryId,
      AlbumId: 2,
    });
  }
}

//以MemoryId为4、5、6进行Fake
exports.data = like;
