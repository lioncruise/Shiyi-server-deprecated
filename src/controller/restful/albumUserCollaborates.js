'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const config = require('../../config');

exports.getCreateFuction = function(modelName) {
  let actionType;
  let targetFieldName;
  switch (modelName)
  {
    case 'AlbumUserCollaborate':
      [actionType, targetFieldName] = ['collaborateAlbum', 'AlbumId'];
      break;
    case 'AlbumUserFollow':
      [actionType, targetFieldName] = ['followAlbum', 'AlbumId'];
      break;
    case 'UserUserFollow':
      [actionType, targetFieldName] = ['collaborateAlbum', 'TargetUserId'];
      break;
  }

  return function*() {
    this.verifyParams({
      [targetFieldName]: 'id',
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
      this.body = {
        statusCode: 422,
        message: 'Validation Failed',
      };
      return;
    }

    let results;
    if (this.request.body.UserIds) {
      //多用户UserIds
      results = yield this.request.body.UserIds.split(',').filter((UserId) => UserId !== '')
        .map((UserId) => {
          return models[modelName].findOrCreate({
            where: {
              [targetFieldName]: this.request.body[targetFieldName],
              UserId: UserId,
            },
          });
        });

      this.body = results.map((item) => item[0].toJSON());
    } else {
      //单用户UserId
      const result = yield models[modelName].findOrCreate({
        where: {
          [targetFieldName]: this.request.body[targetFieldName],
          UserId: this.request.body.UserId,
        },
      });
      this.body = result[0].toJSON();
      results = [result];
    }

    //创建相关action
    yield results.filter((result) => result[1]).map((result) => {
      return utils.models.createAction({
        type: actionType,
        [targetFieldName]: result[0][targetFieldName],
        UserId: result[0].UserId,
      });
    });
  };
};

exports.create = exports.getCreateFuction('AlbumUserCollaborate');
