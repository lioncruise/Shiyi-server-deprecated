'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

const getGetUsersControllerFunction = function(modelName, type) {
  return function*() {
    this.verifyParams({
      albumId: {
        type: 'id',
        required: false,
        allowEmpty: false,
      },
    }, this.query);

    const UserId = this.getUserIdByQueryAndSession(true);
    if (!UserId) {
      return; //已在getUserIdByQueryAndSession方法中添加this.body返回
    }

    const fansResult = yield models[modelName].findAll({
      where: {
        TargetUserId: UserId,
      },
    });
    const followersResult = yield models[modelName].findAll({
      where: {
        UserId,
      },
    });

    const fansUserIds = fansResult.map((elm) => elm.UserId);
    const followersUserIds = followersResult.map((elm) => elm.TargetUserId);

    const targetUserIds = (type === 'followers' ? followersUserIds : fansUserIds);
    const sourceUserIds = (type === 'followers' ?  fansUserIds : followersUserIds);

    const users = yield models.User.findAll({
      paranoid: true,
      where: {
        id: {
          $in: targetUserIds,
        },
      },
    });

    this.body = users.map(function(elm) {
      const user = elm.toJSON();
      user.isFollowEachOther = sourceUserIds.indexOf(user.id) > -1;
      return user;
    });

    if (this.query.albumId) {
      const collaboratesResult = yield models.AlbumUserCollaborate.findAll({
        where: {
          AlbumId: this.query.albumId,
          UserId: targetUserIds,
        },
      });

      const collaboratorIds = collaboratesResult.map((elm) => elm.UserId);
      this.body.forEach(function(elm) {
        elm.isInThisAlbum = collaboratorIds.indexOf(elm.id) > -1;
      });
    }
  };
};

//获取一个用户的关注者
router.get('/getFollowersToUser', getGetUsersControllerFunction('UserUserFollow', 'followers'));
router.get('/getFollowers', getGetUsersControllerFunction('UserUserFollow', 'followers'));

//获取一个用户的粉丝
router.get('/getFansToUser', getGetUsersControllerFunction('UserUserFollow', 'fans'));
router.get('/getFans', getGetUsersControllerFunction('UserUserFollow', 'fans'));

//获取用户和用户的关系
router.get('/getUserUserRelation', function*() {
  this.verifyParams({
    userId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    targetUserId: 'id',
  }, this.query);

  const UserId = this.getUserIdByQueryAndSession(true);
  if (!UserId) {
    return; //已在getUserIdByQueryAndSession方法中添加this.body返回
  }

  const TargetUserId  = parseInt(this.query.targetUserId);

  const AFollowB = yield models.UserUserFollow.find({
    where: {
      UserId: UserId,
      TargetUserId: TargetUserId,
    },
  });
  const BFollowA = yield models.UserUserFollow.find({
    where: {
      UserId: TargetUserId,
      TargetUserId: UserId,
    },
  });

  // 3:互相关注 2:B关注A 1:A关注B 0:互不关注 //字符串类型
  this.body = '' + ((AFollowB ? 1 : 0) + (BFollowA ? 2 : 0));
});

//获取用户和相册的关系
router.get('/getAlbumUserRelation', function*() {
  this.verifyParams({
    userId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    albumId: 'id',
  }, this.query);

  const UserId = this.getUserIdByQueryAndSession(true);
  if (!UserId) {
    return; //已在getUserIdByQueryAndSession方法中添加this.body返回
  }

  const AlbumId  = parseInt(this.query.albumId);

  const album = yield models.Album.find({
    paranoid: true,
    where: {
      id: AlbumId,
    },
  });

  const user = yield models.User.find({
    paranoid: true,
    where: {
      id: UserId,
    },
  });

  if (!album || !user) {
    this.body = {
      statusCode: 404,
      message: '相册或用户不存在',
    };
    return;
  }

  if (album.UserId === user.id) {
    this.body = '1'; //用户是相册的主人
    return;
  }

  const albumUserCollaborate = yield models.AlbumUserCollaborate.find({
    where: {
      AlbumId,
      UserId,
    },
  });

  if (albumUserCollaborate) {
    this.body = '2';
    return; //用户是相册的维护成员之一
  }

  const albumUserFollow = yield models.AlbumUserFollow.find({
    where: {
      AlbumId,
      UserId,
    },
  });

  if (albumUserFollow) {
    this.body = '3';
    return; //用户是相册的关注者之一
  }

  this.body = '0'; //用户和相册无关系
});

//分享用户的html页面
router.get('/userShareHtml', function*() {
  this.verifyParams({
    id: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  }, this.query);

  const user = yield models.User.findById(this.query.id);

  if (!user) {
    this.redirect('/appShareHtml');
    return;
  }

  this.body = yield utils.template('userShare', { user });
});

