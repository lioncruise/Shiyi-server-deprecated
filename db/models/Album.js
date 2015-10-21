'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    coverUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: DataTypes.STRING
    },
    isShare: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isShowRawInfo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allowLike: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    allowComment: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    paranoid: true,
    indexes: [{
      fields: ['UserId', 'isBlocked', 'createdAt', 'id']
    }, {
      fields: ['isBlocked', 'createdAt']
    }, {
      fields: ['id']
    }],
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