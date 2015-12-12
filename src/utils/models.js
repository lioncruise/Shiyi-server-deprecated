'use strict';

const models = require('../db').models;
const debug = require('debug')('utils/models');
const sequelize = require('sequelize');

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
  const memory = yield models.Memory.find({
    paranoid: true,
    where: {
      id: MemoryId,
    },
  });

  if (!memory) {
    throw new Error('Memory Not Found.');
  }

  yield [exports.deleteData('Comment', {
    MemoryId,
  }), exports.deleteData('Like', {
    MemoryId,
  }),
  ];
  yield exports.deleteData('Action', {
    MemoryId,
  });
  const deletedPicturesCount = yield exports.deleteData('Picture', {
    MemoryId,
  });
  yield exports.deleteData('Notification', {
    MemoryId,
  });

  const album = yield models.Album.find({
    paranoid: true,
    where: {
      id: memory.AlbumId,
    },
  });

  if (!album) {
    throw new Error('Album Not Found.');
  }

  //删除冗余统计信息
  yield album.update({
    memoriesCount: album.memoriesCount - 1,
    picturesCount: album.picturesCount - deletedPicturesCount,
  });

  //删除记忆
  yield exports.deleteData('Memory', {
    id: MemoryId,
  });
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
  yield exports.deleteData('AlbumTag', {
    AlbumId,
  });

  const AlbumUserFollows = yield models.AlbumUserFollow.findAll({
    where: {
      AlbumId,
    },
  });

  yield models.User.update({
    followAlbumsCount: sequelize.col('followAlbumsCount') + 1,
  }, {
    where: {
      id: {
        $in: Array.from(AlbumUserFollows.map((elm) => elm.UserId)),
      },
    },
  });

  yield [exports.deleteData('AlbumUserCollaborate', {
    AlbumId,
  }), exports.deleteData('AlbumUserFollow', {
    AlbumId,
  }),
  ];

  yield exports.deleteData('Album', {
    id: AlbumId,
  });
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

  const AlbumUserCollaborates = yield models.AlbumUserCollaborate.findAll({
    where: {
      UserId,
    },
  });
  yield models.Album.update({
    collaboratorsCount: sequelize.col('collaboratorsCount') - 1,
  }, {
    where: {
      id: {
        $in: Array.from(AlbumUserCollaborates.map((elm) => elm.AlbumId)),
      },
    },
  });

  const AlbumUserFollows = yield models.AlbumUserFollow.findAll({
    where: {
      UserId,
    },
  });
  yield models.Album.update({
    fansCount: sequelize.col('fansCount') - 1,
  }, {
    where: {
      id: {
        $in: Array.from(AlbumUserFollows.map((elm) => elm.AlbumId)),
      },
    },
  });

  const UserUserFollows = yield models.UserUserFollow.findAll({
    where: {
      UserId,
    },
  });
  yield models.User.update({
    fansCount: sequelize.col('fansCount') - 1,
  }, {
    where: {
      id: {
        $in: Array.from(UserUserFollows.map((elm) => elm.AlbumId)),
      },
    },
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

  //删除用户
  yield exports.deleteData('User', {
    id: UserId,
  });
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
