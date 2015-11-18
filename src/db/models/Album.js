'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');

//相册
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    coverKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    description: {
      type: DataTypes.STRING,
    },
    isPublic: {
      type: DataTypes.ENUM('private', 'shared', 'public'),
      defaultValue: 'shared',
    },
    allowComment: {
      type: DataTypes.ENUM('none', 'collaborators', 'anyone'),
      defaultValue: 'collaborators',
    },
    isShowRawInfo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    paranoid: true,
    indexes: [],
    getterMethods: {
      coverUrl() {
        return modelUtils.getUrlFunction(this.coverKey);
      },
    },
    instanceMethods: {
      getTagsString() {
        const _this = this;
        return function*() {
          return (yield _this.getTags()).map((tag) => tag.name).join(',');
        };
      },

      toJSONwithistributes(attributes = []) {
        attributes = ['Tags', 'pictureCount', 'lastCreatedPicture', ...attributes];
        const data = this.toJSON();
        attributes.forEach((attr) => this[attr]);
        return data;
      },

      getRelatedInfo() {
        const _this = this;
        return function*() {
          _this.Tags = yield _this.getTagsString();
          _this.pictureCount = yield sequelize.model('Picture').getPictureCountByAlbumId(_this.id);
          _this.lastCreatedPicture = yield sequelize.model('Picture').find({
            paranoid: true,
            where: {
              isBlocked: false,
              AlbumId: _this.id,
            },
            order: [
              [
                'createdAt',
                'DESC',
                ],
            ],
            include: [
              {
                model: sequelize.model('User'),
              },
              ],
          });
          return _this;
        };
      },

    },

  });
};
