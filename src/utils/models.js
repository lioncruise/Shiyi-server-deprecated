'use strict';

const models = require('../db').models;
const debug = require('debug')('utils/models');

exports.createReletedAction = function*(action) {
  debug('create new action.');
  return yield models.Action.create(action);
};

exports.deleteReletedAction = function*(actionWhereParameter) {
  debug('delete action.');
  return yield models.Action.destroy({
    where: actionWhereParameter,
  });
};

exports.deleteData = function*(modelName, where) {
  yield models[modelName].destroy({
    where,
  });
};

//删除记忆相关信息
exports.deleteMemory = function*(MemoryId) {
  yield [exports.deleteData('Comment', {
    MemoryId,
  }), exports.deleteData('Like', {
    MemoryId,
  }),
  ];
  yield exports.deleteData('Action', {
    MemoryId,
  });
  yield exports.deleteData('Picture', {
    MemoryId,
  });
  yield exports.deleteData('Notification', {
    MemoryId,
  });
  yield exports.deleteData('Memory', {
    id: MemoryId,
  });

  //TODO：删除冗余项统计信息
};

//删除相册相关信息
exports.deleteAlbum = function*(AlbumId) {
  yield [exports.deleteData('Comment', {
    AlbumId,
  }), exports.deleteData('Like', {
    AlbumId,
  }),
  ];
  yield exports.deleteData('Action', {
    AlbumId,
  });
  yield exports.deleteData('Picture', {
    AlbumId,
  });
  yield exports.deleteData('Memory', {
    AlbumId,
  });
  yield exports.deleteData('Notification', {
    AlbumId,
  });
  yield [exports.deleteData('AlbumUserCollaborate', {
    AlbumId,
  }), exports.deleteData('AlbumUserFollow', {
    AlbumId,
  }),
  ];
  yield exports.deleteData('AlbumTag', {
    AlbumId,
  });
  yield exports.deleteData('Album', {
    id: AlbumId,
  });

  //TODO:删除冗余项统计信息
  //User冗余项：followAlbumsCount
};

//删除用户相关信息
exports.deleteUser = function*(UserId) {
  yield [exports.deleteData('Comment', {
    UserId,
  }), exports.deleteData('Like', {
    UserId,
  }),
  ];
  yield exports.deleteData('Action', {
    UserId,
  });
  yield exports.deleteData('Picture', {
    UserId,
  });
  yield exports.deleteData('Memory', {
    UserId,
  });
  yield [exports.deleteData('AlbumUserCollaborate', {
    UserId,
  }), exports.deleteData('AlbumUserFollow', {
    UserId,
  }), exports.deleteData('UserUserFollow', {
    $or: [
      {
        UserId,
      }, {
        TargetUserId: UserId,
      },
    ],
  }),
  ];
  yield exports.deleteData('Action', {
    UserId,
  });
  yield exports.deleteData('Album', {
    UserId,
  });
  yield exports.deleteData('Notification', {
    TargetUserId: UserId,
  });
  yield exports.deleteData('Message', {
    $or: [
      {
        UserId,
      }, {
        TargetUserId: UserId,
      },
    ],
  });
  yield exports.deleteData('User', {
    id: UserId,
  });

  //TODO：删除冗余项统计信息
};

//重建数据库冗余项
exports.rebuildDatabaseRedundancy = function*() {
  debug('rebuild database redundancy.');

  //User冗余项：followersCount、followAlbumsCount、fansCount
  //Album冗余项：memoriesCount、picturesCount、fansCount、collaboratorsCount、likesCount、commentsCount、RecentPictureId
  //Memory冗余项：likesCount、commentsCount

  const limit = 100;

  //清理数据库
  //用户不能关注自己
  //TODO
  //用户不能关注自己创建的相册、用户不能关注自己加入的相册
  //TODO
  //用户不能加入自己创建的相册
  //TODO

  //User
  const usersCount = yield models.User.count({});
  for (let i = 1; i <= Number.parseInt((usersCount + limit - 1) / limit); i++) {
    const offset = limit * (i - 1);
    const users = yield models.User.findAll({
      paranoid: true,
      limit,
      offset,
    });

    for (let user of users) {
      const UserId = user.id;
      const followersCount = yield models.UserUserFollow.count({
        where: {
          UserId,
        },
      });
      const fansCount = yield models.UserUserFollow.count({
        where: {
          TargetUserId: UserId,
        },
      });
      const followAlbumsCount = yield models.AlbumUserFollow.count({
        where: {
          UserId,
        },
      });
      yield user.update({
        followersCount,
        fansCount,
        followAlbumsCount,
      });
    }
  }

  //Memory冗余项：likesCount、commentsCount
  const memoriesCount = yield models.Memory.count({});
  for (let i = 1; i <= Number.parseInt((memoriesCount + limit - 1) / limit); i++) {
    const offset = limit * (i - 1);
    const memories = yield models.Memory.findAll({
      paranoid: true,
      limit,
      offset,
    });

    for (let memory of memories) {
      const MemoryId = memory.id;
      const likesCount = yield models.Like.count({
        where: {
          MemoryId,
        },
      });
      const commentsCount = yield models.Comment.count({
        where: {
          MemoryId,
        },
      });

      yield memory.update({
        likesCount,
        commentsCount,
      });
    }
  }

  //Album
  const albumsCount = yield models.Album.count({});
  for (let i = 1; i <= Number.parseInt((albumsCount + limit - 1) / limit); i++) {
    const offset = limit * (i - 1);
    const albums = yield models.Album.findAll({
      paranoid: true,
      limit,
      offset,
    });

    for (let album of albums) {
      const AlbumId = album.id;
      const memoriesCount = yield models.Memory.count({
        paranoid: true,
        where: {
          AlbumId,
        },
      });
      const picturesCount = yield models.Picture.count({
        paranoid: true,
        where: {
          AlbumId,
        },
      });
      const collaboratorsCount = yield models.AlbumUserCollaborate.count({
        where: {
          AlbumId,
        },
      });
      const fansCount = yield models.AlbumUserFollow.count({
        where: {
          AlbumId,
        },
      });
      const likesCount = yield models.Like.count({
        where: {
          AlbumId,
        },
      });
      const commentsCount = yield models.Comment.count({
        where: {
          AlbumId,
        },
      });
      const RecentPicture = yield models.Picture.find({
        paranoid: true,
        where: {
          AlbumId,
        },
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      const RecentPictureId = RecentPicture ? RecentPicture.id : null;

      yield album.update({
        memoriesCount,
        picturesCount,
        collaboratorsCount,
        fansCount,
        likesCount,
        commentsCount,
        RecentPictureId,
      });
    }
  }
};
