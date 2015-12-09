'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.setAlbumTags = function(album = { Tags: []}) {
  album.tags = album.Tags.map((tag) => tag.name).join(',');
  delete album.Tags;
  return album;
};

exports.getTagObjsArray = function*(tags = '') {
  const tagNames = tags.split(',').filter((tag) => tag !== '');
  const tagObjsArray = [];
  for (let name of tagNames) {
    tagObjsArray.push((yield models.Tag.findOrCreate({
      where: {
        name,
      },
    }))[0]);
  }

  return tagObjsArray;
};

exports.show = function*() {
  this.verifyParams({
    id: 'id',
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
    isWithMemories: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithMemoriesDetails: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithPictures: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithUser: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithCollaborators: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithFans: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [{
    model: models.Tag,
  },
  ];
  const limit = (this.query.limit && Number.parseInt(this.query.limit) <= 50) ? Number.parseInt(this.query.limit) : 50;
  const offset = this.query.offset ? Number.parseInt(this.query.offset) : 0;

  let isWithDetails = false;
  if (this.query.isWithMemories === 'true') {
    if (this.query.isWithMemoriesDetails === 'true') {
      isWithDetails = true;
      include.push({
        model: models.Memory,
        limit,
        offset,
        include: [{
          model: models.Picture,
        }, {
          model: models.Comment,

          //TODO 用一条查询查到全部信息
          // include: [{
          //   model: models.Comment,
          //   as: 'OrignalComment',
          // }, {
          //   model: models.User,
          // },
          // ],
        }, {
          model: models.Like,

          //TODO 用一条查询查到全部信息
          // include: [{
          //   model: models.User,
          // },
          // ],
        },
        ],
      });
    } else {
      include.push({
        model: models.Memory,
        limit,
        offset,
        include: [{
          model: models.Picture,
        },
        ],
      });
    }
  }

  if (this.query.isWithRecentPicture === 'true') {
    include.push({
      model: models.Picture,
      as: 'RecentPicture',
    });
  }

  if (this.query.isWithPictures === 'true') {
    include.push({
      model: models.Picture,
      limit,
      offset,
    });
  }

  if (this.query.isWithUser === 'true') {
    include.push({
      model: models.User,
    });
  }

  if (this.query.isWithCollaborators === 'true') {
    include.push({
      model: models.User,
      as: 'collaborators',
    });
  }

  const album = yield models.Album.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!album) {
    this.body = {
      statusCode: 404,
      message: '相册不存在',
    };
    return;
  }

  this.body = exports.setAlbumTags(album.toJSON());

  if (isWithDetails) {
    //如果需要详细信息，进行二次查询

    //Comment二次数据
    const commentIds = new Set();
    this.body.Memories.forEach(function(memory) {
      memory.Comments.forEach(function(comment) {
        commentIds.add(comment.id);
      });
    });

    const detailedCommentsSQLResults = yield models.Comment.findAll({
      paranoid: true,
      where: {
        id: {
          $in: Array.from(commentIds.values()),
        },
      },
      include: [{
        model: models.Comment,
        as: 'OrignalComment',
        include: [{
          model: models.User,
        },
        ],
      }, {
        model: models.User,
      },
      ],
    });

    const detailedComments = new Map();
    detailedCommentsSQLResults.forEach(function(comment) {
      detailedComments.set(comment.id, comment);
    });

    //Like二次数据
    const likeIds = new Set();
    this.body.Memories.forEach(function(memory) {
      memory.Likes.forEach(function(like) {
        likeIds.add(like.id);
      });
    });

    const detailedLikesSQLResults = yield models.Like.findAll({
      paranoid: true,
      where: {
        id: {
          $in: Array.from(likeIds.values()),
        },
      },
      include: [{
        model: models.User,
      },
      ],
    });

    const detailedLikes = new Map();
    detailedLikesSQLResults.forEach(function(like) {
      detailedLikes.set(like.id, like);
    });

    //进行替换
    this.body.Memories.forEach(function(memory) {
      memory.Comments = memory.Comments.map((comment) => detailedComments.get(comment.id));
      memory.Likes = memory.Likes.map((like) => detailedLikes.get(like.id));
    });
  }
};

exports.create = function*() {
  this.verifyParams({
    title: 'string',
    description: {
      type: 'string',
      required: true,
      allowEmpty: true,
    },
    tags: {
      type: 'string',
      required: true,
      allowEmpty: true,
    },
    coverStoreKey: {
      type: 'string',
      required: false,
      allowEmpty: false,
    },
    isPublic: {
      type: 'enum',
      values: ['private', 'shared', 'public'],
      required: false,
      allowEmpty: false,
    },
    allowComment: {
      type: 'enum',
      values: ['none', 'collaborators', 'anyone'],
      required: false,
      allowEmpty: false,
    },
  });

  const album = yield models.Album.create(Object.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  yield album.setTags(yield exports.getTagObjsArray(this.request.body.tags));

  this.body = album.toJSON();
  this.body.tags = this.request.body.tags;

  //创建相关action
  if (album.isPublic === 'public') {
    yield utils.models.createReletedAction({
      type: 'createAlbum',
      AlbumId: album.id,
      UserId: this.session.user.id,
    });
  }
};

exports.update = function*() {
  this.verifyParams({
    id: 'id',
    title: {
      type: 'string',
      required: false,
    },
    description: {
      type: 'string',
      required: false,
      allowEmpty: true,
    },
    coverStoreKey: {
      type: 'string',
      required: false,
      allowEmpty: false,
    },
    tags: {
      type: 'string',
      required: false,
      allowEmpty: true,
    },
    isPublic: {
      type: 'enum',
      values: ['private', 'shared', 'public'],
      required: false,
      allowEmpty: false,
    },
    allowComment: {
      type: 'enum',
      values: ['none', 'collaborators', 'anyone'],
      required: false,
      allowEmpty: false,
    },
  });

  let album = yield models.Album.find({
    paranoid: true,
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (!album) {
    this.body = {
      statusCode: 404,
      message: '相册不存在',
    };
    return;
  }

  const originIsPublic = String(album.isPublic);

  album = yield album.update(this.request.body);

  yield album.setTags(yield exports.getTagObjsArray(this.request.body.tags));

  //创建相关action
  if (originIsPublic !== 'public' && album.isPublic === 'public') {
    utils.models.createReletedAction({
      type: 'openAlbum',
      AlbumId: album.id,
      UserId: this.session.user.id,
    });
  }
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  const album = yield models.Album.find({
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (!album) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
    return;
  }

  yield utils.models.deleteAlbum(album.id);
};
