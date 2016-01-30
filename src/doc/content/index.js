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
  require('./restful/reports'),
  require('./restful/feedbacks'),
  require('./restful/dailies'),
  require('./restful/tags'),

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
  require('./search'),
  require('./discover'),
  require('./contacts'),
];

for (let file of files) {
  content = content.concat(file);
}

module.exports = content;
