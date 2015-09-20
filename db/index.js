'use strict';

var Sequelize = require('sequelize');
var sqlite3 = require('sqlite3');
var config = require('../config');
var path = require('path');

var sequelize = new Sequelize(config.db.database, null, null, config.db);

var models = {};
exports.models = models;

var modelNames = ['User', 'Album', 'Tag', 'Action', 'Picture', 'Like', 'Message', 'Comment', 'Report', 'Feedback', 'AlbumTag', 'AlbumUser', 'Keyvalue', 'Admin'];

exports.define = function() {
  modelNames.forEach(function(modelName) {
    models[modelName] = sequelize.import(path.join(__dirname, 'models', modelName + '.js'));
  });
};

exports.setAssociations = function() {
  models.User.hasMany(models.Album);
  models.User.hasMany(models.Action);
  models.User.hasMany(models.Message);

  models.Album.belongsTo(models.User, {
    as: 'Creator',
    foreignKey: 'UserId'
  });
  models.Album.belongsToMany(models.Tag, {through: 'AlbumTag'});
  models.Album.hasMany(models.Picture);
  models.Album.belongsToMany(models.User, {through: 'AlbumUser'});

  models.Action.belongsTo(models.User);
  models.Action.belongsTo(models.Album);
  models.Action.hasMany(models.Picture);
  models.Action.hasMany(models.Like);

  models.Picture.belongsTo(models.User);
  models.Picture.belongsTo(models.Album);
  models.Picture.belongsTo(models.Action);
  models.Picture.hasMany(models.Like);

  models.Like.belongsTo(models.User);
  models.Like.belongsTo(models.Picture);
  models.Like.belongsTo(models.Action);

  models.Message.belongsTo(models.User);
  models.Message.belongsTo(models.Like);
  models.Message.belongsTo(models.Comment);
  models.Message.belongsTo(models.Message, {
    as: 'OrignalMessage',
    foreignKey: 'OrignalMessageId'
  });

  models.Report.belongsTo(models.User, {
    as: 'Reporter',
    foreignKey: 'ReporterId'
  });
  models.Report.belongsTo(models.Picture);
  models.Report.belongsTo(models.Album);
  models.Report.belongsTo(models.User);

  models.Feedback.belongsTo(models.User);
};

//建立ORM
exports.define();
exports.setAssociations();

exports.init = function*() {
  var syncModelsArray = modelNames.map(function(modelName) {
    return models[modelName].sync({
      force: true
    });
  });

  yield syncModelsArray;
};