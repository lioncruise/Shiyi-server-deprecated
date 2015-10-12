'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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