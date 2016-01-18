
const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const actions = [];

actions.push({
  type: 'createAlbum',
  AlbumId: 1,
  UserId: 1,
});

actions.push({
  type: 'createMemory',
  MemoryId: 1,
  AlbumId: 1,
  UserId: 1,
});

actions.push({
  type: 'collaborateAlbum',
  AlbumId: 1,
  UserId: 4,
});

actions.push({
  type: 'followAlbum',
  AlbumId: 1,
  UserId: 4,
});

exports.data = actions;