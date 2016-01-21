'use strict';

const fs = require('fs');
const path = require('path');

const templates = {
  daily: ['title', 'description', 'content'],
  notFound: ['message'],
};

const templateExecute = new Map();
for (let template in templates) {
  /* jshint ignore:start */
  let templateFile = fs.readFileSync(path.join(__dirname, '../../static/templates/', template + '.html'));
  templateExecute[template] = new Function(templates[template], 'return `' + templateFile + '`');
  /* jshint ignore:end */
}

module.exports = function(templateName, ...params) {
  return templateExecute[templateName](...params);
};
