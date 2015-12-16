'use strict';

const notification = require('../../utils/notification');
const should = require('should');

describe('utils/notification', function() {
  it('should get a notification on all devices', function(done) {
    notification.sendNotificationToApp('测试推送标题', '测试推送内容（全部APP）')(function(err, res) {
      res.result.should.equal('ok');
      done(err, res);
    });
  });

  it('should get a notification on the device with given cid', function(done) {
    let cid = '06fe917679a82622368d08af6f8f21d5';
    notification.sendNotificationToSingle('测试推送标题', '测试推送内容（单个设备）', cid)(function(err, res) {
      res.result.should.equal('ok');
      done(err, res);
    })
  })

  it('should get a notification on the devices with given cids', function(done) {
    let cidList = ['06fe917679a82622368d08af6f8f21d5'];
    notification.sendNotificationToList('测试推送标题', '测试推送内容（列表中的设备）', cidList)(function(err, res) {
      res.result.should.equal('ok');
      done(err, res);
    })
  })
});
