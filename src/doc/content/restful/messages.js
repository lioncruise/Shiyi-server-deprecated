'use strict';

module.exports = [{
  fileName: 'GET messages :id',
  func: '获取某条私信',
  note: [
          '1.可加 isWithUsersInfo=true 参数，在返回内容中添加 发信人和收信人信息 内容。',
          ],
  requests: [
    {
      method: 'get',
      url: '/messages/1',
    }, {
      method: 'get',
      url: '/messages/1?isWithUsersInfo=true',
    },
  ],
}, {
  fileName: 'POST messages',
  func: '新建一条私信',
  requests: [
  {
    method: 'post',
    url: '/messages',
    data: {
      content: '你好，约么？',
      TargetUserId: '2',
    },
  },
  ],
},
];
