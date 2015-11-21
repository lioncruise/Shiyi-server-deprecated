'use strict';

const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');
const config = require('../config');
const path = require('path');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db);

const models = {};

const modelNames = ['Action', 'Admin', 'Album', 'AlbumTag',
  'AlbumUserCollaborate', 'AlbumUserFollow', 'Comment', 'Feedback', 'Keyvalue',
  'Like', 'Memory', 'Message', 'Notification', 'Picture', 'Report',
  'Story', 'Tag', 'User', 'UserUserFollow',
];

//定义每一个类型
function define() {
  modelNames.forEach((modelName) => {
    models[modelName] = sequelize.import(path.join(__dirname, 'models', modelName + '.js'));
  });
}

//建立类型间的关联关系
function setAssociations() {
  //用户与相册
  //用户是相册的主人
  models.User.hasMany(models.Album, {
    as: 'ownAlbums',
    foreignKey: 'UserId',
  });
  models.Album.belongsTo(models.User, {
    foreignKey: 'UserId',
  });

  //用户是相册的维护者
  models.User.belongsToMany(models.Album, {
    through: 'AlbumUserCollaborate',
    foreignKey: 'UserId',
    as: 'relatedAlbums',
  });
  models.Album.belongsToMany(models.User, {
    through: 'AlbumUserCollaborate',
    foreignKey: 'AlbumId',
    as: 'collaborators',
  });

  //用户关注相册
  models.User.belongsToMany(models.Album, {
    through: 'AlbumUserFollow',
    foreignKey: 'UserId',
    as: 'followAlbums',
  });
  models.Album.belongsToMany(models.User, {
    through: 'AlbumUserFollow',
    foreignKey: 'AlbumId',
    as: 'fans',
  });

  //用户与用户
  models.User.belongsToMany(models.User, {
    through: 'UserUserFollow',
    foreignKey: 'TargetUserId',
    as: 'fans',
  });
  models.User.belongsToMany(models.User, {
    through: 'UserUserFollow',
    foreignKey: 'UserId',
    as: 'followers',
  });

  //用户与记忆
  models.User.hasMany(models.Memory);
  models.Memory.belongsTo(models.User, {
    as: 'Creator',
    foreignKey: 'UserId',
  });

  //用户与图片
  models.User.hasMany(models.Picture);
  models.Picture.belongsTo(models.User);

  //记忆与相册
  models.Album.hasMany(models.Memory);
  models.Memory.belongsTo(models.Album);

  //相册与图片
  models.Album.hasMany(models.Picture);
  models.Picture.belongsTo(models.Album);

  //相册与最近一张图片
  models.Album.belongsTo(models.Picture, {
    as: 'RecentPicture',
    foreignKey: 'RecentPictureId',
    constraints: false,
  });

  //记忆与图片
  models.Memory.hasMany(models.Picture);
  models.Picture.belongsTo(models.Memory);

  //记忆与动态
  models.Action.belongsTo(models.Memory);
  models.Memory.hasOne(models.Action);

  //相册与动态
  models.Album.hasMany(models.Action);
  models.Action.belongsTo(models.Album);

  //人与动态
  models.User.hasMany(models.Action);
  models.Action.belongsTo(models.User);
  models.Action.belongsTo(models.User, {
    as: 'TargetUser',
    foreignKey: 'TargetUserId',
  });

  //相册与标签
  models.Album.belongsToMany(models.Tag, {
    through: 'AlbumTag',
  });
  models.Tag.belongsToMany(models.Album, {
    through: 'AlbumTag',
  });

  //记忆与评论
  models.Memory.hasMany(models.Comment);
  models.Comment.belongsTo(models.Memory);

  //用户与评论
  models.User.hasMany(models.Comment);
  models.Comment.belongsTo(models.User);

  //评论与评论
  models.Comment.belongsTo(models.Comment, {
    as: 'OrignalComment',
    foreignKey: 'OrignalCommentId',
  });

  //记忆与点赞
  models.Memory.hasMany(models.Like);
  models.Like.belongsTo(models.Memory);

  //用户与点赞
  models.User.hasMany(models.Like);
  models.Like.belongsTo(models.User);

  //用户与私信
  models.Message.belongsTo(models.User);
  models.Message.belongsTo(models.User, {
    as: 'TargetUser',
    foreignKey: 'TargetUserId',
  });

  //用户与推送
  models.Notification.belongsTo(models.User, {
    as: 'TargetUser',
    foreignKey: 'TargetUserId',
  });

  //推送与其内容
  models.Notification.belongsTo(models.Message);
  models.Notification.belongsTo(models.Action);
  models.Notification.belongsTo(models.Comment);
  models.Notification.belongsTo(models.Like);

  //举报与用户
  models.User.hasMany(models.Report);
  models.Report.belongsTo(models.User);
  models.Report.belongsTo(models.User, {
    as: 'TargetUser',
    foreignKey: 'TargetUserId',
  });
  models.Report.belongsTo(models.Album);
  models.Report.belongsTo(models.Memory);
  models.Report.belongsTo(models.Picture);

  //反馈与用户
  models.User.hasMany(models.Feedback);
  models.Feedback.belongsTo(models.User);
}

//强制重建数据库
const init = function*() {
  yield sequelize.sync({
    force: true,
  });
};

//建立ORM
define();
setAssociations();

module.exports = {
  sequelize,
  models,
  define,
  setAssociations,
  init,
};
