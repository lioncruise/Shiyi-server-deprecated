'use strict';

module.exports = [{
  fileName: 'GET getAllUnreadMessages',
  func: '获取自己全部的未读消息',
  note: [
          '1.消息被提取之后被删除。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getAllUnreadMessages',
    },
  ],
}, {
  fileName: 'GET getAllMessages',
  func: '获取所有以往的Messages信息',
  note: [
          '1.消息被提取之后被删除。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getAllMessages',
    },
  ],
},
];
