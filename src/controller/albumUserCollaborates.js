'use strict';

const router = require('../router').router;
const models = require('../db').models;

exports.getDeleteFuction = function(modelName) {
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
        [targetFieldName]: this.request.body[targetFieldName],
      },
    });

    //删除相关action
    yield models.Action.destroy({
      where: {
        UserId: {
          $in: UserIds,
          type: actionType,
          [targetFieldName]: this.request.body[targetFieldName]
        },
      },
    });
  };
};

router.delete('/albumUserCollaborates', exports.getDeleteFuction('albumUserCollaborates'));
