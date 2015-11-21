'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const comments = [];

//4
for (let i = 1; i <= 10; i++) {
  let UserId = i;
  comments.push({
    content: chance.sentence({ words: 5 }),
    UserId,
    MemoryId: 4,
    OrignalCommentId: i > 1 ? i : null,
  });
}

//5 6
for (let i = 1; i <= 10; i++) {
  let UserId = i;
  for (let j = 5; j <= 6; j++) {
    let MemoryId = j;
    comments.push({
      content: chance.sentence({ words: 5 }),
      UserId,
      MemoryId,
    });
  }
}

//以MemoryId为4、5、6进行Fake
exports.data = comments;
