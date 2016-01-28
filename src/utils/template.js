'use strict';

const router = require('../router').router;
const models = require('../db').models;
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '../../static/templates');
const templateList = fs.readdirSync(templatePath);

const template = {};
for (let tpl of templateList) {
  template[tpl.split('.')[0]] = fs.readFileSync(path.join(templatePath, tpl), 'utf-8');
}

module.exports = (templateName, data) => ejs.render(template[templateName], data);
