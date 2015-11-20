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
  if (this.query.isWithMemories === 'true') {
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

  if (this.query.isWithFans === 'true') {
    include.push({
      model: models.User,
      as: 'fans',
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
    return this.body = {
      statusCode: 404,
      message: '相册不存在',
    };
  }

  this.body = exports.setAlbumTags(album.toJSON());
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
    coverKey: {
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
    yield utils.models.createAction({
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
    coverKey: {
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
  const originIsPublic = String(album.isPublic);

  if (!album) {
    return this.body = {
      statusCode: 404,
      message: '相册不存在',
    };
  }

  album = yield album.update(this.request.body);

  yield album.setTags(yield exports.getTagObjsArray(this.request.body.tags));

  //创建相关action
  if (originIsPublic !== 'public' && album.isPublic === 'public') {
    utils.models.createAction({
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

  //删除与相册相关的信息
  //TODO:

  const result = yield models.Album.destroy({
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (result === 0) {
    return this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }
};
