'use strict';

const utility = require('utility');

module.exports = [{
  fileName: 'POST verifyPhone',
  func: '验证用户手机号',
  note: [
          '1.前端向mob发起验证请求，然后用户输入验证码后，把手机号和验证码一起发给后端这个接口。',
          '2.后端会验证验证码是否正确，返回status为是否正确。',
          '3.也就是说，验证码是mob的SDK发送的，验证是否正确是我的服务器进行的。',
          '4.这样设计的原因，是防止别人抓包、反编译，来直接模拟发送register接口。后端记录一下验证内容，可以在注册的时候，知道哪些手机是被验证过的。',
          ],
  requests: [
    {
      method: 'post',
      url: '/verifyPhone',
      data: {
        phone: '15945990589',
        secCode: '5678',
      },
    },
  ],
}, {
  fileName: 'POST register',
  func: '用户注册',
  note: [
          '1.phone会进行正则检测  (^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$  。',
          '2.password进行md5加密。',
          '3.可以不包含avatarStoreKey项，默认为default。',
          '4.会自动给用户建立一个默认相册。',
          '5.会建立cookie。',
          '6.手机号需要提前调用/verifyPhone接口验证，否则无法正常注册。',
          ],
  requests: [
    {
      method: 'post',
      url: '/register',
      data: {
        phone: '15945990589',
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
  fileName: 'GET getUserIdByKey',
  func: 'PC端服务器通过用户特征值获得用户id',
  note: [
          '1.PC端服务器调用的接口，app不调用这个接口',
          ],
  requests: [
  {
    method: 'get',
    url: '/getUserIdByKey?key=123456',
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
  fileName: 'PUT update',
  func: '更新用户信息',
  note: [
          '1.增量更新，可以只添加需要更改的项。',
          '2.可以更改手机号。',
          ],
  requests: [
    {
      method: 'put',
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
