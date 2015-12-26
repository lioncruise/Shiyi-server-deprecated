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
}, {
  fileName: 'GET getAllUnreadMessageSenders',
  func: '获取全部未读的信息的发送者，每个不同User返回一条，User里附带最近一条message信息',
  note: [
          '1.获取全部未读的信息的发送者，每个不同User返回一条，User里附带最近一条message信息。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getAllUnreadMessageSenders',
    },
  ],
}, {
  fileName: 'GET getAllUnreadMessagesWithOneUser',
  func: '按UserId获取未读信息，和这个用户的互相message信息',
  note: [
          '1.按UserId获取未读信息，和这个用户的互相message信息。',
          '2.消息被提取之后被删除。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getAllUnreadMessagesWithOneUser?userId=1',
    },
  ],
},
];
