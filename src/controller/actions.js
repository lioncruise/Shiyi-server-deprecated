'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

// 获取一个人所应该展示接收的动态
router.get('/getActions', function*() {
  const limit = (this.query.limit && Number.parseInt(this.query.limit) <= 50) ? Number.parseInt(this.query.limit) : 50;
  const offset = this.query.offset ? Number.parseInt(this.query.offset) : 0;

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

  this.body = actions.map((action) => action.toJSON());
});
