'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const albumTags = [];

//前10用户每人3个相册
for (let i = 1; i <= 30; i++) {
  for (let j = 1; j <= 5; j++) {
    albumTags.push({
      AlbumId: i,
      TagId: chance.integer({
        min: 5 * (j - 1) + 1,
        max: 5 * (j - 1) + 5,
      }),
    });
  }
}

//共30个相册
exports.data = albumTags;
