'use strict';

const moment = require('moment');

//动态
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Action', {
    type: {
      type: DataTypes.ENUM('createMemory', 'createAlbum', 'openAlbum', 'collaborateAlbum', 'followAlbum', 'followUser', 'estory'),
      allowNull: false,
    },
  }, {
    paranoid: true,
    indexes: [{
      fields: ['id'],
    }, {
      fields: ['MemoryId'],
    }, {
      fields: ['TargetUserId'],
    }, {
      fields: ['AlbumId', { attribute: 'createdAt', order: 'DESC' }],
    }, {
      fields: ['UserId', 'type', { attribute: 'createdAt', order: 'DESC' }],
    }, {
      fields: ['UserId', 'AlbumId'],
    }, {
      fields: ['UserId', 'TargetUserId'],
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
    tableName: 'actions',
  });
};
