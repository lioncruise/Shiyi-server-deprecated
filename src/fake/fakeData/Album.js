'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const albums = [];

//前10用户每人3个相册
for (let i = 1; i <= 10; i++) {
  let UserId = i;
  albums.push({
    title: '默认相册',
    description: '默认相册',
    UserId,
  });
  albums.push({
    title: chance.state({ full: true }),
    description: chance.state({ full: true }),
    UserId,
  });
  albums.push({
    title: chance.state({ full: true }),
    description: chance.state({ full: true }),
    UserId,
    isPublic: 'public',
  });
}

//共30个相册
exports.data = albums;
