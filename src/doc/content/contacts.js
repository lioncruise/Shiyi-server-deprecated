'use strict';

module.exports = [{
  fileName: 'POST getUsersByPhones',
  func: '按手机号查找已注册用户，通讯录匹配',
  note: [
          '1.返回的每个user里面，包含一个relation字段，类型为字符串类型    3:互相关注 2:对方关注我 1:我关注对方 0:互不关注 -1:未注册',
          '2.返回的每个user里面，包含一个name字段，为上传时的那个name',
          ],
  requests: [
    {
      method: 'post',
      url: '/getUsersByPhones',
      data: {
        namesString: '小王,小张,未注册',
        phonesString: '13000000002,13000000003,13945999999',
      },
    },
  ],
},
];
