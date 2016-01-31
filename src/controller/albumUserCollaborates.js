'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const config = require('../config');
const sequelize = require('sequelize');

router.get('/joinAlbum', function*() {
  //未登录状态，跳转到app下载页面
  if (!this.session || !this.session.user || !this.session.user.id) {
    this.redirect('/appShareHtml');
    return;
  }

  //登录状态，进行添加操作
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

  if (!album) {
    this.body = {
      statusCode: 404,
      message: '相册不存在，添加失败',
    };
    return;
  }

  this.body = {
    statusCode: 200,
    data: album.toJSON(),
  };

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
  let actionType; //相关action的type
  let targetFieldName; //关系中的字段名
  let addSubject; //发起人
  let addSubjectAddFieldName; //发起人需要更新的字段
  let addObject; //被影响人
  let addObjectAddFieldName; //被影响人需要更新的字段
  switch (modelName)
  {
    case 'AlbumUserCollaborate':
      [actionType, targetFieldName, addSubject, addSubjectAddFieldName, addObject, addObjectAddFieldName] = ['collaborateAlbum', 'AlbumId', null, null, 'Album', 'collaboratorsCount'];
      break;
    case 'AlbumUserFollow':
      [actionType, targetFieldName, addSubject, addSubjectAddFieldName, addObject, addObjectAddFieldName] = ['followAlbum', 'AlbumId', 'User', 'followAlbumsCount', 'Album', 'fansCount'];
      break;
    case 'UserUserFollow':
      [actionType, targetFieldName, addSubject, addSubjectAddFieldName, addObject, addObjectAddFieldName] = ['followUser', 'TargetUserId', 'User', 'followersCount', 'User', 'fansCount'];
      break;
  }

  return function*() {
    //参数验证
    this.verifyParams({
      [targetFieldName]: 'id',
      UserId: {
        type: 'id',
        required: false,
      },
    }, Object.assign(this.request.body, this.query));

    if (!this.request.body.UserId && !this.request.body.UserIds) {
      this.body = {
        statusCode: 422,
        message: 'Validation Failed',
      };
      return;
    }

    const isSingleUser = !!this.request.body.UserId;
    const userIds = isSingleUser ? [this.request.body.UserId] : this.request.body.UserIds.split(',').filter((UserId) => UserId !== '');

    //查找关系
    const existRelations = yield models[modelName].findAll({
      where: {
        UserId: {
          $in: userIds,
        },
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });
    const haveToBeUpdatedUserIds = existRelations.map((relation) => relation.UserId);

    //发起人相关字段更新
    if (addSubject) {
      yield models[addSubject].update({
        [addSubjectAddFieldName]: sequelize.literal(`${addSubjectAddFieldName} - 1`),
      }, {
        where: {
          id: {
            $in: haveToBeUpdatedUserIds,
          },
        },
      });
    }

    //被影响人相关字段更新
    if (addObject) {
      yield models[addObject].update({
        [addObjectAddFieldName]: sequelize.literal(`${addObjectAddFieldName} - ${existRelations.length}`),
      }, {
        where: {
          id: this.request.body[targetFieldName],
        },
      });
    }

    //删除关系
    const deleteCount = yield models[modelName].destroy({
      where: {
        UserId: {
          $in: userIds,
        },
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });

    //删除相关action
    yield models.Action.destroy({
      where: {
        UserId: {
          $in: userIds,
        },
        type: actionType,
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });
  };
};

router.delete('/albumUserCollaborates', exports.getDeleteFuction('AlbumUserCollaborate'));
