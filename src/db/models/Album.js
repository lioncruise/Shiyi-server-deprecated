'use strict';

var config = require('../../config');
var modelUtils = require('./modelUtils');

//相册
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    coverKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.defaultPictureKey
    },
    description: {
      type: DataTypes.STRING
    },
    isPublic: {
      type: DataTypes.ENUM('private', 'shared', 'public'),
      defaultValue: 'shared'
    },
    allowComment: {
      type: DataTypes.ENUM('none', 'collaborators', 'anyone'),
      defaultValue: 'collaborators'
    },
    isShowRawInfo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    paranoid: true,
    indexes: [],
    getterMethods: {
      coverUrl: function() {
        return modelUtils.getUrlFunction(this.coverKey);
      }
    },
    instanceMethods: {
      getTagsString: function() {
        var that = this;
        return function*() {
          return (yield that.getTags()).map(function(Tag) {
            return Tag.name;
          }).join(',');
        };
      },
      toJSONwithAttributes: function(Attributes) {
        Attributes = ['Tags', 'pictureCount', 'lastCreatedPicture'].concat(Attributes ? Attributes : []);
        var that = this;
        var data = that.toJSON();
        Attributes.forEach(function(attr) {
          data[attr] = that[attr];
        });
        return data;
      },
      getRelatedInfo: function() {
        var that = this;
        return function*() {
          that.Tags = yield that.getTagsString();
          that.pictureCount = yield sequelize.model('Picture').getPictureCountByAlbumId(that.id);
          that.lastCreatedPicture = yield sequelize.model('Picture').find({
            paranoid: true,
            where: {
              isBlocked: false,
              AlbumId: that.id
            },
            order: [
              ['createdAt', 'DESC']
            ],
            include: [{
              model: sequelize.model('User')
            }]
          });
          return that;
        };
      }
    }
  });
};