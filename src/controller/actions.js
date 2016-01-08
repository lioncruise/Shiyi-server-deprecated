'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const moment = require('moment');
const sequelize = require('sequelize');

// 获取一个人所应该展示接收的动态
router.get('/getActions', function*() {
  this.verifyParams({
    offset: {
      type: 'int',
      required: false,
      allowEmpty: false,
    },
    limit: {
      type: 'int',
      required: false,
      allowEmpty: false,
    },
    lastActionId: {
      type: 'int',
      required: false,
      allowEmpty: false,
    },
    lastActionCreatedTimestamp: {  // 这个参数应为Unix时间戳
      type: 'int',
      required: false,
      allowEmpty: false,
    },
  });
  const limit = (this.query.limit && Number.parseInt(this.query.limit) <= 50) ? Number.parseInt(this.query.limit) : 50;
  const offset = this.query.offset ? Number.parseInt(this.query.offset) : 0;

  // 通过“最后创建时间”或者“最后一条的id”构造最后动态的时间
  let lastActionCreatedAt = this.query.lastActionCreatedTimestamp ?
                              new Date(Number.parseInt(this.query.lastActionCreatedTimestamp) * 1000)
                              :
                              0;
  if (this.query.hasOwnProperty('lastActionId')) {
    const lastAction = yield models.Action.findById(Number.parseInt(this.query.lastActionId));
    if (lastAction && lastAction.createdAt > lastActionCreatedAt) {
      lastActionCreatedAt = lastAction.createdAt;
    }
  }

  /**
   * 用户可以收到的动态类型：
   * 1. 用户所创建、加入、关注的相册所产生的动态
   * 2. 用户关注的用户的动态
   */

  const ownAlbumIds = (yield models.Album.findAll({
    paranoid: true,
    attributes: ['id'],
    where: {
      UserId: this.session.user.id,
    },
  })).map((album) => album.id);

  const followAlbumIds = (yield models.AlbumUserCollaborate.findAll({
    attributes: ['AlbumId'],
    where: {
      UserId: this.session.user.id,
    },
  })).map((relation) => relation.AlbumId);

  const allAlbumIds = ownAlbumIds.concat(followAlbumIds);

  const followUserIds = (yield models.UserUserFollow.findAll({
    attributes: ['TargetUserId'],
    where: {
      UserId: this.session.user.id,
    },
  })).map((relation) => relation.TargetUserId);

  const actions = yield models.Action.findAll({
    paranoid: true,
    where: {
      createdAt:{
        $gt: lastActionCreatedAt,
      },
      $or:[
        {
          AlbumId: {
            $in: allAlbumIds,
          },
        }, {
          UserId: {
            $in: followUserIds,
          },
          type: {
            $in: ['createAlbum', 'openAlbum', 'followAlbum', 'followUser'],
          },
        },
      ],
    },
    include: [{
        model: models.Memory,
      }, {
        model: models.Album,
      }, {
        model: models.User,
      }, {
        model: models.User,
        as: 'TargetUser',
      },
    ],
    offset,
    limit,
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  const memoriesToUpdate = [];
  this.body = actions.map(function(action) {
    if (action.Memory) {
      memoriesToUpdate.push(action.Memory.id);
    }

    return action.toJSON();
  });

  //更新浏览量
  yield models.Memory.update({
    viewsCount: sequelize.literal('viewsCount + 1'),
  }, {
    where: {
      id: {
        $in: memoriesToUpdate,
      },
    },
  });
});
