'use strict';

const db = require('../db');
const fse = require('co-fs-extra');
const co = require('co');

const fakeModelNames = [
  'User', 'Album', 'Memory', 'Picture',
];

const fakeDataArray = [];

for (let name of fakeModelNames) {
  let data = require(`./fakeData/${name}.js`).data;
  fakeDataArray.push(...(data.map((value) => [name, value])));
}

exports.run = co.wrap(function*() {
  for (let [name, value] of fakeDataArray) {
    yield db.models[name].create(value);
  }

  console.log('Database data fake finish.');
});
