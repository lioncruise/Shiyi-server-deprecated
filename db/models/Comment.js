'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING
    }
  });
};