'use strict';

module.exports = [{
  fileName: 'GET getActions',
  func: '获取一个人所应该展示接收的动态',
  note: [
          '1.每一条动态都附带这需要显示的附加信息。',
          '2.action的type可能为createMemory, createAlbum, openAlbum, collaborateAlbum, followAlbum, followUser, estory之一，需要用不同的显示方式。',
          '3.可添加 offset 和 limit 控制Actions的返回，offset默认为0，limit最大为50。',
          '4.可以使用 lastActionCreatedTimestamp(时间戳) lastActionId(Action.id) 两个参数返回 创建时间和某一记录之后的Action记录，没有会返回空数组。两个参数最好不要一起使用。',
          '5.可以使用 firstActionCreatedTimestamp(时间戳) firstActionId(Action.id) 两个参数返回 创建时间和某一记录之前的Action记录，没有会返回空数组。两个参数最好不要一起使用。',
          '6.文档中4的demo并没有展示很好，这是因为文档生成的数据库数据是同时写入数据库的，并不存在时间上的区别',
          ],
  requests: [
    {
      method: 'get',
      url: '/getActions?offset=0&limit=10',
    },
    {
      method: 'get',
      url: '/getActions?lastActionId=1',
    },
    {
      method: 'get',
      url: '/getActions?lastActionCreatedTimestamp=1451123382',
    },
    {
      method: 'get',
      url: '/getActions?firstActionCreatedTimestamp=1451123382',
    },
  ],
},
];
