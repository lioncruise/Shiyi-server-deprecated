'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    type: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      fields: ['type', 'createdAt', 'id']
    }, {
      fields: ['UserId', 'createdAt', 'id']
    }, {
      fields: ['id']
    }]
  });
};