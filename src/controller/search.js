'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const config = require('../config');
const modelUtils = require('../db/modelUtils');

//手机号码的7位前缀
const phonePrefix =  /(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{4}|170[059]\d{3})/;

router.get('/searchUsers', function*() {
  this.verifyParams({
    keyword: 'string',
    albumId: {
      type: 'id',
      required: false,
    },
  }, this.query);

  //当关键字满足手机号码7位前缀时，认为是按手机号搜索
  const isPhone = this.query.keyword.search(phonePrefix) === 0;

  if (isPhone) {
    this.body = yield models.User.findAll({
      paranoid: true,
      where: {
        phone: {
          $like: this.query.keyword + '%',
        },
      },
    });
  } else {
    this.body = yield models.User.findAll({
      paranoid: true,
      where: {
        nickname: {
          $like: '%' + this.query.keyword + '%',
        },
      },
    });
  }

  this.body = this.body.map((user) => user.toJSON());

  //如果搜索参数中有albumId，则返回用户是否在相册中
  if (this.query.albumId && this.body.length) {
    const album = yield models.Album.find({
      paranoid: true,
      where: {
        id: this.query.albumId,
      },
    });
    if (!album) {
      this.body = {
        statusCode: 404,
        message: '相册不存在',
      };
      return;
    }

    const userIds = this.body.map((user) => user.id);
    const albumUserCollaborates = yield models.AlbumUserCollaborate.findAll({
      where: {
        AlbumId: this.query.albumId,
        UserId: {
          $in: userIds,
        },
      },
    });

    const albumUserCollaborateFlags = {};
    albumUserCollaborates.forEach(function(elm) {
      albumUserCollaborateFlags[elm.UserId] = true;
    });

    this.body.forEach(function(user) {
      user.isInThisAlbum = !!albumUserCollaborateFlags[user.id];
      if (user.id === album.UserId) {
        user.isInThisAlbum = true;
      }
    });
  }
});

router.get('/searchAlbums', function*() {
  this.verifyParams({
    keyword: 'string',
  }, this.query);

  this.body = yield models.Album.findAll({
    paranoid: true,
    where: {
      title: {
        $like: '%' + this.query.keyword + '%',
      },
      isPublic: 'public',
    },
  });

  this.body = this.body.map((album) => album.toJSON());
});
