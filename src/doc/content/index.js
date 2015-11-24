'use strict';

let content = [];
let files = [
  require('./restful/users'),
  require('./restful/albums'),
  require('./restful/memories'),
  require('./restful/pictures'),
  require('./restful/messages'),
  require('./restful/albumUserCollaborates'),
  require('./restful/albumUserFollows'),
  require('./restful/userUserFollows'),
  require('./restful/comments'),
  require('./restful/likes'),

  require('./account'),
  require('./actions'),
  require('./albums'),
  require('./albumUserCollaborates'),
  require('./albumUserFollows'),
  require('./userUserFollows'),
  require('./keyvalues'),
  require('./messages'),
  require('./qiniu'),
  require('./users'),
];

for (let file of files) {
  content = content.concat(file);
}

module.exports = content;
