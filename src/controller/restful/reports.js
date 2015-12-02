'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

// get / 返回此人的所有report
exports.index = function*() {
  this.verifyParams({});
  const reports = yield models.Report.findAll({
    paranoid: true,
    where: {
      UserId: '' + this.session.user.id,
    },
  });
  this.body = reports.map((item) => item.toJSON());
};

// get /:id 返回对应id的report
exports.show = function*() {
  this.verifyParams({
    id: 'id',
  });
  const report = yield models.Report.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
  });

  if (report.UserId !== this.session.user.id) {
    this.body = {
      statusCode: 403,
      message: '请求report不属于此人',
    };
    return;
  }

  this.body = report.toJSON();
};

// post content 上传一个report
exports.create = function*() {
  this.verifyParams({
    content: 'string',
    TargetUserId: {
      type: 'id',
      required: false,
    },
    AlbumId: {
      type: 'id',
      required: false,
    },
    MemoryId: {
      type: 'id',
      required: false,
    },
    PhotoId: {
      type: 'id',
      required: false,
    },
  });
  const params = this.request.body;

  if (params.TargetUserId || params.AlbumId || params.MemoryId || params.PhotoId) {
    const report = yield models.Report.create(Object.assign(this.request.body, {
      UserId: this.session.user.id,
    }));
    this.body = report.toJSON();
  }else {
    this.body = {
      statusCode: 403,
      message: 'report对象至少要指定一个',
    };
    return;
  }
};
