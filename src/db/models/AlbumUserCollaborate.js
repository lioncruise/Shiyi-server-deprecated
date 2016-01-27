'use strict';

const moment = require('moment');

//相册和用户的维护者多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumUserCollaborate', {
  }, {
    indexes: [{
      unique: true,
      fields: ['AlbumId', 'UserId'],
    }, {
      fields: ['UserId'],
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
    tableName: 'albumusercollaborates',
  });
};
