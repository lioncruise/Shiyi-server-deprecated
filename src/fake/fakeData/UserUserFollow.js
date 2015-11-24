'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const userUserFollows = [];

for (let i = 2; i <= 10; i++) {
  userUserFollows.push({
    UserId: i,
    TargetUserId: 1,
  });
  userUserFollows.push({
    UserId: 1,
    TargetUserId: i,
  });
}

exports.data = userUserFollows;
