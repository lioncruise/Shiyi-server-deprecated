'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const config = require('../config');

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
        required: false,
      },
      UserIds: {
        type: 'string',
        required: false,
      },
    }, Object.assign(this.request.body, this.query));

    const UserIdString = this.request.body.UserId || this.query.UserId;
    const UserIdsString = this.request.body.UserIds || this.query.UserIds;

    if (!UserIdString && !UserIdsString) {
      this.body = {
        statusCode: 422,
        message: 'Validation Failed',
      };
      return;
    }

    let UserIds = [];
    if (UserIdsString) {
      UserIds = UserIdsString.split(',').filter((UserId) => UserId !== '')
        .map((UserId) => parseInt(UserId));
    } else {
      UserIds.push(parseInt(UserIdString));
    }

    yield models[modelName].destroy({
      where: {
        UserId: {
          $in: UserIds,
        },
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });

    //删除相关action
    yield models.Action.destroy({
      where: {
        UserId: {
          $in: UserIds,
        },
        type: actionType,
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });
  };
};

router.delete('/albumUserCollaborates', exports.getDeleteFuction('AlbumUserCollaborate'));
