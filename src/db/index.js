'use strict';

var Sequelize = require('sequelize');
var sqlite3 = require('sqlite3');
var config = require('../config');
var path = require('path');

var sequelize = new Sequelize(config.db.database, null, null, config.db);

var models = {};
exports.models = models;

var modelNames = ['Action', 'Admin', 'Album', 'AlbumTag',
  'AlbumUser', 'Comment', 'Feedback', 'Keyvalue', 'Like',
  'Memory', 'Message', 'Picture', 'Report',
  'Story', 'Tag', 'Token', 'User'
];

/**
 * 定义每一个类型
 */
exports.define = function() {
  modelNames.forEach(function(modelName) {
    models[modelName] = sequelize.import(path.join(__dirname, 'models', modelName + '.js'));
  });
};

/**
 * 建立类型间的关联关系
 */
exports.setAssociations = function() {
  models.User.hasMany(models.Album, {
    as: 'ownAlbums'
  });
  models.User.hasMany(models.Action);
  models.User.hasMany(models.Message);
  models.User.belongsToMany(models.Album, {
    through: 'AlbumUser',
    as: 'relatedAlbums'
  });

  models.Album.belongsTo(models.User, {
    as: 'Creator',
    foreignKey: 'UserId'
  });
  models.Album.belongsToMany(models.Tag, {
    through: 'AlbumTag'
  });
  models.Album.hasMany(models.Picture);
  models.Album.hasMany(models.Action);
  models.Album.belongsToMany(models.User, {
    through: 'AlbumUser'
  });

  models.Tag.belongsToMany(models.Album, {
    through: 'AlbumTag'
  });

  models.Action.belongsTo(models.User);
  models.Action.belongsTo(models.Album);
  models.Action.hasMany(models.Picture);
  models.Action.hasMany(models.Like);

  models.Picture.belongsTo(models.User);
  models.Picture.belongsTo(models.Album);
  models.Picture.belongsTo(models.Action);
  models.Picture.hasMany(models.Like);
  models.Picture.hasMany(models.Comment);

  models.Like.belongsTo(models.User);
  models.Like.belongsTo(models.Picture);
  models.Like.belongsTo(models.Action);

  models.Comment.belongsTo(models.User);
  models.Comment.belongsTo(models.Picture);
  models.Comment.belongsTo(models.Action);
  models.Comment.belongsTo(models.Comment, {
    as: 'OrignalComment',
    foreignKey: 'OrignalCommentId'
  });

  models.Message.belongsTo(models.User);
  models.Message.belongsTo(models.User, {
    as: 'TargetUser',
    foreignKey: 'TargetUserId'
  });
  models.Message.belongsTo(models.Like);
  models.Message.belongsTo(models.Comment);

  models.Report.belongsTo(models.User, {
    as: 'Reporter',
    foreignKey: 'ReporterId'
  });
  models.Report.belongsTo(models.Action);
  models.Report.belongsTo(models.Picture);
  models.Report.belongsTo(models.Album);
  models.Report.belongsTo(models.User);

  models.Feedback.belongsTo(models.User);
};

//建立ORM
exports.define();
exports.setAssociations();

/**
 * 强制重建数据库
 */
exports.init = function*() {
  var syncModelsArray = modelNames.map(function(modelName) {
    return models[modelName].sync({
      force: true
    });
  });

  yield syncModelsArray;
};

exports.addNewMessage = function*(UserId, TargetUserId, type, CommentId, LikeId, content) {
  var data = {
    type: type,
    TargetUserId: TargetUserId
  };
  switch (type) {
    case 'C':
      data.CommentId = CommentId;
      break;
    case 'L':
      data.LikeId = LikeId;
      break;
    case 'B':
      data.content = content;
      break;
  }
  var message = yield models.Message.create(data);
  return message;
};