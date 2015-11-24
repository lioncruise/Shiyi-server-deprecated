'use strict';

module.exports = [{
  fileName: 'POST userUserFollows',
  func: '新建用户和用户的关注关系',
  note: [
          '1.这个接口会 让用户关注某个其他，即用户成为了一个用户的关注者。',
          '2.可以包含UserId设置一个用户关注一个用户，或者UserIds加入多个用户关注一个用户。',
          ],
  requests: [
  {
    method: 'post',
    url: '/userUserFollows',
    data: {
      TargetUserId: '1',
      UserId: '2',
    },
  }, {
    method: 'post',
    url: '/userUserFollows',
    data: {
      TargetUserId: '1',
      UserIds: '3,4,5,6,7',
    },
  },
  ],
},
];
