'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const albumUserCollaborates = [];

for (let i = 2; i <= 10; i++) {
  albumUserCollaborates.push({
    AlbumId: 2,
    UserId: i,
  });
}

exports.data = albumUserCollaborates;
