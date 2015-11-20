'use strict';

const router = require('../router').router;
const models = require('../db').models;

exports.getDeleteFuction = function(modelName) {
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

    let UserIds = [];
    if (this.request.body.UserIds) {
      UserIds = this.request.body.UserIds.split(',').filter((UserId) => UserId !== '')
        .map((UserId) => parseInt(UserId));
    } else {
      UserIds.push(parseInt(this.request.body.UserId));
    }

    yield models[modelName].destroy({
      where: {
        UserId: {
          $in: UserIds,
        },
        AlbumId: this.request.body.AlbumId,
      },
    });
  };
};

router.delete('/albumUserCollaborates', exports.getDeleteFuction('albumUserCollaborates'));
