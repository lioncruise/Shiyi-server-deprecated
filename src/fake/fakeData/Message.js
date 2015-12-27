'use strict';

const utility = require('utility');
const chance = require('chance').Chance();

const messages = [{
  type: 'message',
  UserId: 1,
  TargetUserId: 2,
  content: 'Hello world!',
}, {
  type: 'message',
  UserId: 2,
  TargetUserId: 1,
  content: 'PHP is the best language!',
},
];

exports.data = messages;
