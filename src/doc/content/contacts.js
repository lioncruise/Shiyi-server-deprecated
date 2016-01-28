'use strict';

module.exports = [{
  fileName: 'POST getUsersByPhones',
  func: '按手机号查找已注册用户，通讯录匹配',
  note: [
          '1.    3:互相关注 2:对方关注我 1:我关注对方 0:互不关注 字符串类型',
          '2.返回的每个user里面，包含一个name字段，为上传时的那个name',
          ],
  requests: [
    {
      method: 'post',
      url: '/getUsersByPhones',
      data: {
        names: ['小王', '小张'],
        phones: ['13000000002', '13000000003'],
      },
    },
  ],
},
];
