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
}, {
  fileName: 'GET getOneUserRelation',
  func: '获取当前用户和指定用户的关系',
  note: [
          '1.可以带着userId=2的参数，指定当前的用户，如果不带的话则使用请求者当前用户。',
          '2.必须带targetUserId参数。',
          '3.可能返回4种状态。3表示相互关注，2表示只有target用户关注user用户，1表示只有user用户关注target用户，0表示互相不关注。',
          '4.返回的都是字符串类型！',
          ],
  requests: [
    {
      method: 'get',
      url: '/getOneUserRelation?userId=1&targetUserId=2',
    },
  ],
},
];
