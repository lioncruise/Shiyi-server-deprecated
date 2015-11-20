'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const config = require('../../config');

exports.getCreateFuction = function(modelName) {
  return function*() {
    this.verifyParams({
      AlbumId: 'id',
      UserId: {
        type: 'id',
        required: false,
      },
      UserIds: {
        type: 'string',
        required: false,
      },
    });

    if (!this.request.body.UserId && !this.request.body.UserIds) {
      return this.body = {
        statusCode: 422,
        message: 'Validation Failed',
      };
    }

    // 同一条AlbumId、UserId数据库中只能插入一次
    // 插入数据时会进行外键检测
    try {
      if (this.request.body.UserIds) {
        //多用户UserIds
        const result = yield this.request.body.UserIds.split(',').filter((UserId) => UserId !== '')
          .map((UserId) => {
            return models[modelName].findOrCreate({
              where: {
                AlbumId: this.request.body.AlbumId,
                UserId,
              },
            });
          });
        this.body = result.map((item) => item.toJSON());
      } else {
        //单用户UserId
        const result = yield models[modelName].findOrCreate({
          where: {
            AlbumId: this.request.body.AlbumId,
            UserId: this.request.body.UserId,
          },
        });
        this.body = result[0].toJSON();
      }
    } catch (e) {
      this.body = {
        statusCode: 422,
        message: e.name,
      };
    }
  };
};

exports.create = exports.getCreateFuction('AlbumUserCollaborate');
