'use strict';

const utility = require('utility');

module.exports = [{
  fileName: 'POST register',
  func: '用户注册',
  note: [
          '1.phone会进行正则检测  (^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$  。',
          '2.password进行md5加密。',
          '3.可以不包含avatarStoreKey项，默认为default。',
          '4.会自动给用户建立一个默认相册。',
          '5.会建立cookie。',
          ],
  requests: [
    {
      method: 'post',
      url: '/register',
      data: {
        phone: '15945990000',
        nickname: '小王',
        password: utility.md5('123456'),
        gender: 'M',
        motto: 'Do cool things that matter.',
        avatarStoreKey: '123',
      },
    },
  ],
}, {
  fileName: 'POST login',
  func: '登陆',
  note: [
          '1.会建立cookie',
          ],
  requests: [
  {
    method: 'post',
    url: '/login',
    data: {
      phone: '13000000001',
      password: utility.md5('13000000001'),
    },
  },
  ],
}, {
  fileName: 'GET logout',
  func: '登出',
  note: [
          '1.会删除所有cookie',
          ],
  requests: [
  {
    method: 'get',
    url: '/logout',
  },
  ],
},  {
  fileName: 'POST update',
  func: '更新用户信息',
  note: [
          '1.增量更新，可以只添加需要更改的项。',
          '2.可以更改手机号。',
          ],
  requests: [
    {
      method: 'post',
      url: '/update',
      data: {
        phone: '13000000071',
        nickname: '小王',
        password: utility.md5('1234567'),
        gender: 'F',
        birthday: '1990-10-11',
        hometown: '黑龙江 哈尔滨',
        motto: 'Do cool things that matter.',
        avatarStoreKey: '123',
      },
    },
  ],
},
];
