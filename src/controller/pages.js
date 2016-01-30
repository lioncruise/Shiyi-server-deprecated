'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

router.get('/appShareHtml', function*() {
  this.body = utils.template('appShare', {
    message: 'app',
  });
});
