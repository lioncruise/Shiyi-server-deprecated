'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const config = require('../../config');
const sequelize = require('sequelize');

exports.getCreateFuction = function(modelName) {
  let actionType;
  let targetFieldName;
  switch (modelName)
  {
    case 'AlbumUserCollaborate':
      [actionType, targetFieldName] = ['collaborateAlbum', 'AlbumId'];
      break;
    case 'AlbumUserFollow':
      [actionType, targetFieldName] = ['followAlbum', 'AlbumId'];
      break;
    case 'UserUserFollow':
      [actionType, targetFieldName] = ['followUser', 'TargetUserId'];
      break;
  }

  return function*() {
    this.verifyParams({
      [targetFieldName]: 'id',
      UserId: {
        type: 'id',
        required: false,
      },
      UserIds: {
        type: 'string',
        required: false,
      },
    });

    if (!this.request.body.UserId && !this.request.body.UserIds) {
      this.body = {
        statusCode: 422,
        message: 'Validation Failed',
      };
      return;
    }

    //如果是用户加入相册，检测相册是否为public或shared
    if (modelName === 'AlbumUserCollaborate') {
      const album = yield models.Album.find({
        paranoid: true,
        where: {
          id: this.request.body.AlbumId,
        },
      });
      if (album.isPublic === 'private') {
        this.body = {
          statusCode: 403,
          message: '相册不可加入',
        };
        return;
      }
    }

    let results;
    if (this.request.body.UserIds) {
      //多用户UserIds
      results = yield this.request.body.UserIds.split(',').filter((UserId) => UserId !== '')
        .map((UserId) => {
          return models[modelName].findOrCreate({
            where: {
              [targetFieldName]: this.request.body[targetFieldName],
              UserId: UserId,
            },
          });
        });

      const num = results.length;
      if (modelName === 'AlbumUserCollaborate') {
        const album = yield models.Album.find({
          where: {
            id: this.request.body.AlbumId,
          },
        });
        yield models.Album.update({
          collaboratorsCount: album.collaboratorsCount + num,
        }, {
            where: {
              id: this.request.body.AlbumId,
            },
          });
      }

      if (modelName === 'AlbumUserFollow') {
        const album = yield models.Album.find({
          where: {
            id: this.request.body.AlbumId,
          },
        });
        yield models.Album.update({
          fansCount: album.fansCount + num,
        }, {
            where: {
              id: this.request.body.AlbumId,
            },
          });
      }

      if (modelName === 'UserUserFollow') {
        const user = yield models.User.find({
          where: {
            id: this.request.body.TargetUserId,
          },
        });
        yield models.User.update({
          fansCount: user.fansCount + num,
        }, {
            where: {
              id: this.request.body.TargetUserId,
            },
          });
      }

      this.body = results.map((item) => item[0].toJSON());
    } else {
      //单用户UserId
      let result = yield models[modelName].find({
        where: {
          [targetFieldName]: this.request.body[targetFieldName],
          UserId: this.request.body.UserId,
        },
      });
      if (result) {
        this.body = {
          statusCode: 403,
          message: '该关系已存在',
        };
        return;
      }

      result = yield models[modelName].findOrCreate({
        where: {
          [targetFieldName]: this.request.body[targetFieldName],
          UserId: this.request.body.UserId,
        },
      });
      if (modelName === 'AlbumUserCollaborate') {
        //检查是否已经关注了此相册
        const relation = yield models.AlbumUserFollow.find({
          where: {
            AlbumId: this.request.body.AlbumId,
            UserId: this.request.body.UserId,
          },
        });

        //如果已经关注则关注的冗余数据不＋1
        if (relation) {
          yield models.Album.update({
            collaboratorsCount: sequelize.literal('collaboratorsCount + 1'),
          }, {
              where: {
                id: this.request.body.AlbumId,
              },
            });
        }

        yield models.Album.update({
          collaboratorsCount: sequelize.literal('collaboratorsCount + 1'),
          fansCount: sequelize.literal('fansCount + 1'),
        }, {
            where: {
              id: this.request.body.AlbumId,
            },
          });
        yield models.User.update({
          followAlbumsCount: sequelize.literal('followAlbumsCount + 1'),
        }, {
            where: {
              id: this.request.body.UserId,
            },
          });
      }

      if (modelName === 'AlbumUserFollow') {
        yield models.Album.update({
          fansCount: sequelize.literal('fansCount + 1'),
        }, {
            where: {
              id: this.request.body.AlbumId,
            },
          });
        yield models.User.update({
          followAlbumsCount: sequelize.literal('followAlbumsCount + 1'),
        }, {
            where: {
              id: this.request.body.UserId,
            },
          });
      }

      if (modelName === 'UserUserFollow') {
        yield models.User.update({
          fansCount: sequelize.literal('fansCount + 1'),
        }, {
            where: {
              id: this.request.body.TargetUserId,
            },
          });
        yield models.User.update({
          followersCount: sequelize.literal('followersCount + 1'),
        }, {
            where: {
              id: this.request.body.UserId,
            },
          });
      }

      this.body = result[0].toJSON();
      results = [result];
    }

    //创建相关action
    yield results.filter((result) => result[1]).map((result) => {
      return utils.models.createReletedAction({
        type: actionType,
        [targetFieldName]: result[0][targetFieldName],
        UserId: result[0].UserId,
      });
    });

    //如果是用户加入相册，创建关注关系
    if (modelName === 'AlbumUserCollaborate') {
      yield results.filter((result) => result[1]).map((result) => {
        return models.AlbumUserFollow.findOrCreate({
          where: {
            AlbumId: result[0].AlbumId,
            UserId: result[0].UserId,
          },
        });
      });
    }
  };
};

exports.create = exports.getCreateFuction('AlbumUserCollaborate');
