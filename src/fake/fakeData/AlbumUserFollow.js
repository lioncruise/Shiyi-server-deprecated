'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const albumUserFollows = [];

for (let i = 3; i <= 10; i++) {
  albumUserFollows.push({
    AlbumId: 4,
    UserId: i,
  });
}

exports.data = albumUserFollows;
