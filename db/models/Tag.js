'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      fields: ['name', 'id']
    }, {
      fields: ['id']
    }]
  });
};