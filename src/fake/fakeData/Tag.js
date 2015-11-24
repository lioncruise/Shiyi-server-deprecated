'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const tagNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const tags = Array.from(tagNames).map((name) => ({
  name,
}));

//共30个相册
exports.data = tags;
