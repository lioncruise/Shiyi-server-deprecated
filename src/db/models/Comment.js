'use strict';

const moment = require('moment');

//评论
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    content: {
      type: 'VARCHAR(185)',
    },
  }, {
    charset: 'utf8mb4',
    paranoid: true,
    indexes: [{
      fields: ['id'],
    },
    {
      fields: ['MemoryId'],
    },
    {
      fields: ['AlbumId'],
    },
    {
      fields: ['UserId'],
    },
    {
      fields: ['OrignalCommentId'],
    },
    ],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'comments',
  });
};
