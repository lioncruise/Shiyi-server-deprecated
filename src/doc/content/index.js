'use strict';

let content = [];
let files = [
  require('./restful/users'),
  require('./restful/albums'),
  require('./restful/memories'),
];

for (let file of files) {
  content = content.concat(file);
}

module.exports = content;
