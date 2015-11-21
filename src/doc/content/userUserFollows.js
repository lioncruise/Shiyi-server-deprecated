'use strict';

module.exports = [{
  fileName: 'DELETE userUserFollows',
  func: '删除用户和用户的关注关系',
  note: [
          '1.此接口为post /userUserFollows 的逆操作。',
          '2.可以包含UserId设置一个用户不关注一个用户，或者UserIds多个用户不关注一个用户。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/userUserFollows',
    data: {
      TargetUserId: '1',
      UserId: '2',
    },
  }, {
    method: 'delete',
    url: '/userUserFollows',
    data: {
      TargetUserId: '1',
      UserIds: '3,4',
    },
  },
  ],
},
];
