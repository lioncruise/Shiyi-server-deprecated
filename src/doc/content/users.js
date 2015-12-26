'use strict';

module.exports = [{
  fileName: 'GET getFollowers',
  func: '获取一个人关注的人',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.每个user中包含字段isFollowEachOther，代表用户和发起人是不是互相关注的关系。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getFollowers?userId=1',
    },
  ],
}, {
  fileName: 'GET getFans',
  func: '获取一个人的粉丝（关注他的人）',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.每个user中包含字段isFollowEachOther，代表用户和发起人是不是互相关注的关系。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getFans?userId=1',
    },
  ],
},
];
