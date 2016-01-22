'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const config = require('../../config');
const sequelize = require('sequelize');
const ejs = require('ejs');

exports.getCreateFuction = function(modelName) {
  let actionType; //相关action的type
  let targetFieldName; //关系中的字段名
  let addSubject; //发起人
  let addSubjectAddFieldName; //发起人需要更新的字段
  let addObject; //被影响人
  let addObjectAddFieldName; //被影响人需要更新的字段
  let addObjectInstance;
  let addSubjectInstance;
  switch (modelName)
  {
    case 'AlbumUserCollaborate':
      [actionType, targetFieldName, addSubject, addSubjectAddFieldName, addObject, addObjectAddFieldName] = ['collaborateAlbum', 'AlbumId', null, null, 'Album', 'collaboratorsCount'];
      break;
    case 'AlbumUserFollow':
      [actionType, targetFieldName, addSubject, addSubjectAddFieldName, addObject, addObjectAddFieldName] = ['followAlbum', 'AlbumId', 'User', 'followAlbumsCount', 'Album', 'fansCount'];
      break;
    case 'UserUserFollow':
      [actionType, targetFieldName, addSubject, addSubjectAddFieldName, addObject, addObjectAddFieldName] = ['followUser', 'TargetUserId', 'User', 'followersCount', 'User', 'fansCount'];
      break;
  }

  return function*() {
    //参数验证
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

    //如果是用户加入相册，检测相册是否为public或shared
    if (modelName === 'AlbumUserCollaborate') {
      const album = yield models.Album.find({
        paranoid: true,
        where: {
          id: this.request.body.AlbumId,
        },
      });
      if (album.isPublic === 'private') {
        this.body = {
          statusCode: 403,
          message: '相册不可加入',
        };
        return;
      }
    }

    const isSingleUser = !!this.request.body.UserId;
    const userIds = isSingleUser ? [this.request.body.UserId] : this.request.body.UserIds.split(',').filter((UserId) => UserId !== '');
    const haveToBeUpdatedUserIds = [];
    this.body = [];

    let countAddNum = 0;
    for (let userId of userIds) {
      const result = yield models[modelName].findOrCreate({
        where: {
          [targetFieldName]: this.request.body[targetFieldName],
          UserId: userId,
        },
      });
      this.body.push(result[0].toJSON());
      if (result[1]) {
        countAddNum++;
        haveToBeUpdatedUserIds.push(userId);
      }
    }

    if (isSingleUser) {
      if (this.body.length) {
        this.body = this.body[0];
      } else {
        this.body = null;
      }
    }

    //发起人相关字段更新
    if (addSubject) {
      addSubjectInstance = yield models[addSubject].update({
        [addSubjectAddFieldName]: sequelize.literal(`${addSubjectAddFieldName} + 1`),
      }, {
        where: {
          id: {
            $in: haveToBeUpdatedUserIds,
          },
        },
      });
    }

    //被影响人相关字段更新
    if (addObject) {
      addObjectInstance = yield models[addObject].update({
        [addObjectAddFieldName]: sequelize.literal(`${addObjectAddFieldName} + ${countAddNum}`),
      }, {
        where: {
          id: this.request.body[targetFieldName],
        },
      });
    }

    //创建相关action
    yield haveToBeUpdatedUserIds.map((userId) => {
      return utils.models.createReletedAction({
        type: actionType,
        [targetFieldName]: this.request.body[targetFieldName],
        UserId: userId,
      });
    });

    //创建推送 follow User
    if (modelName === 'UserUserFollow') {
      if (addObjectInstance.getuiCid) {
        utils.notification.sendNotificationToSingle(
          config.getui.template.userUserFollow.title,
          ejs.render(config.getui.template.userUserFollow.text, addSubjectInstance),
          addObjectInstance.getuiCid);
      }
    }
  };
};

exports.create = exports.getCreateFuction('AlbumUserCollaborate');
