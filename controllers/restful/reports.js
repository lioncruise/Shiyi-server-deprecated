'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });

  var report = yield models.Report.find({
    where: {
      id: this.params.id
    },
    include: [{
      model: models.Action
    }, {
      model: models.Picture
    }, {
      model: models.Album
    }, {
      model: models.User,
      as: 'Reporter'
    }, {
      model: models.User
    }]
  });

  if (!report) {
    return this.body = {
      statusCode: 404,
      message: '举报不存在'
    };
  }

  this.body = report.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    UserId: {
      type: 'id',
      required: false
    },
    ActionId: {
      type: 'id',
      required: false
    },
    PictureId: {
      type: 'id',
      required: false
    },
    AlbumId: {
      type: 'id',
      required: false
    }
  });

  var report = models.Report.build(this.request.body);
  report.ReporterId = this.session.user.id;

  report = yield report.save();

  this.body = report.toJSON();
};