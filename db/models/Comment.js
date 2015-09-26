'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      fields: ['ActionId', 'createdAt', 'OrignalCommentId', 'id']
    }, {
      fields: ['PictureId', 'createdAt', 'OrignalCommentId', 'id']
    }, {
      fields: ['UserId', 'createdAt', 'id']
    }, {
      fields: ['OrignalCommentId', 'createdAt', 'id']
    }, {
      fields: ['id']
    }]
  });
};