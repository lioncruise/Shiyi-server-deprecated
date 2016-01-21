'use strict';

const db = require('../db');
const fse = require('co-fs-extra');
const co = require('co');
const utils = require('../utils');

const fakeModelNames = [
  'Keyvalue',
  'User', 'Album', 'Memory', 'Picture',  'Message',
  'Tag', 'AlbumTag', 'AlbumUserCollaborate', 'AlbumUserFollow',
  'Comment', 'Like', 'UserUserFollow', 'Report', 'Feedback', 'Daily', 'Action',
];

const fakeDataArray = [];

for (let name of fakeModelNames) {
  /* jshint ignore:start */
  let data = require(`./fakeData/${name}.js`).data;
  fakeDataArray.push(...(data.map((value) => [name, value])));
  /* jshint ignore:end */
}

exports.run = co.wrap(function*() {
  for (let [name, value] of fakeDataArray) {
    try {
      yield db.models[name].create(value);
    } catch (e) {
      console.log([name, value]);
      console.log(e);
    }
  }

  yield utils.models.rebuildDatabaseRedundancy;

  console.log('Database data fake finish.');
});
