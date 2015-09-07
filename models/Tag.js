'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Tag', {
  name: {
    type: DataTypes.STRING
  }
});