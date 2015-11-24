'use strict';

const db = require('../db');
const fse = require('co-fs-extra');
const co = require('co');

const fakeModelNames = [
  'Keyvalue',
  'User', 'Album', 'Memory', 'Picture',  'Message',
  'Tag', 'AlbumTag', 'AlbumUserCollaborate', 'AlbumUserFollow',
  'Comment', 'Like', 'UserUserFollow',
];

const fakeDataArray = [];

for (let name of fakeModelNames) {
  let data = require(`./fakeData/${name}.js`).data;
  fakeDataArray.push(...(data.map((value) => [name, value])));
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

  console.log('Database data fake finish.');
});
