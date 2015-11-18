'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const pictures = [];

//前10用户每人的每个相册的每个动态，有一定数量图片
for (let i = 1; i <= 10; i++) {
  let UserId = i;
  for (let j = 1; j <= 3; j++) {
    let AlbumId = 10 * (i - 1) + j;
    for (let k = 1; k <= 3; k++) {
      let MemoryId = 3 * (AlbumId - 1) + k;

      // 插入k张图片
      for (let p = 1; p <= k; p++) {
        pictures.push({
          pictureKey: 'default',
          type: 'picture',
          UserId,
          AlbumId,
          MemoryId,
        });
      }
    }
  }
}

//共180张图片
exports.data = pictures;
