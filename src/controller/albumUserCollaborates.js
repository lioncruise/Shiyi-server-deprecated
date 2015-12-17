'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const config = require('../config');
const sequelize = require('sequelize');

router.get('/joinAlbum', function*() {
  const AlbumId = parseInt(this.query.a);
  const secCode = this.query.c;
  if (!AlbumId || !secCode || secCode !== utils.getJoinAlbumSecCode(AlbumId)) {
    this.body = {
      statusCode: 404,
      message: '参数错误，添加失败',
    };
    return;
  }

  const album = yield models.Album.find({
    paranoid: true,
    where: {
      id: AlbumId,
      isPublic: {
        $ne: 'private',
      },
    },
  });

  if (!album || !this.session || !this.session.user || !this.session.user.id) {
    this.body = {
      statusCode: 404,
      message: '权限错误，添加失败',
    };
    return;
  }

  this.body = album.toJSON();

  //自己无法加入到自己创建的相册中
  if (parseInt(this.session.user.id) === parseInt(album.UserId)) {
    return;
  }

  yield models.AlbumUserCollaborate.findOrCreate({
    where: {
      AlbumId,
      UserId: this.session.user.id,
    },
  });
});

exports.getDeleteFuction = function(modelName) {
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
        required: true,
      },
    }, Object.assign(this.request.body, this.query));

    const UserIdString = this.request.body.UserId || this.query.UserId;

    const result = yield models[modelName].find({
      where: {
        UserId: UserIdString,
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });
    if (!result) {
      this.body = {
        statusCode: 404,
        message: '该关系不存在',
      };
      return;
    }

    yield models[modelName].destroy({
      where: {
        UserId: UserIdString,
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });

    if (modelName === 'AlbumUserCollaborate') {
      yield models.Album.update({
        collaboratorsCount: sequelize.literal('collaboratorsCount - 1'),
      }, {
          where: {
            id: this.request.body.AlbumId,
          },
        });
    }

    if (modelName === 'AlbumUserFollow') {
      yield models.Album.update({
        fansCount: sequelize.literal('fansCount - 1'),
      }, {
          where: {
            id: this.request.body.AlbumId,
          },
        });
      yield models.User.update({
        followAlbumsCount: sequelize.literal('followAlbumsCount - 1'),
      }, {
          where: {
            id: this.request.body.UserId,
          },
        });
    }

    if (modelName === 'UserUserFollow') {
      yield models.User.update({
        fansCount: sequelize.literal('fansCount - 1'),
      }, {
          where: {
            id: this.request.body.TargetUserId,
          },
        });
      yield models.User.update({
        followersCount: sequelize.literal('followersCount - 1'),
      }, {
          where: {
            id: this.request.body.UserId,
          },
        });
    }

    //删除相关action
    yield models.Action.destroy({
      where: {
        UserId: UserIdString,
        type: actionType,
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });
  };
};

router.delete('/albumUserCollaborates', exports.getDeleteFuction('AlbumUserCollaborate'));
