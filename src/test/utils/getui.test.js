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


});
