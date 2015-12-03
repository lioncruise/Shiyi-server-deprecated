'use strict';

module.exports = [{
  fileName: 'GET reports',
  func: '获取某用户所添加的所有举报',
  note: [
    '1.只能获取已登录用户的举报，需要先登录',
  ],
  requests: [
    {
      method: 'get',
      url: '/reports',
    },
  ],
}, {
  fileName: 'GET reports :id',
  func: '获取某个举报信息',
  note: [
    '1.获取举报的登录者必须为其上传者，否则无法取到',
  ],
  requests: [
    {
      method: 'get',
      url: '/reports/1',
    },
  ],
}, {
  fileName: 'POST reports',
  func: '新建一个举报',
  note: [
    '1.举报类型有4种，根据字段名称判断举报的对象',
  ],
  requests: [
    {
      method: 'post',
      url: '/reports',
      data: {
        content: '举报该用户.. .',
        TargetUserId: 6,
      },
    },
    {
      method: 'post',
      url: '/reports',
      data: {
        content: '举报该相册...',
        AlbumId: 6,
      },
    },
    {
      method: 'post',
      url: '/reports',
      data: {
        content: '举报该记忆...',
        MemoryId: 6,
      },
    },
    {
      method: 'post',
      url: '/reports',
      data: {
        content: '举报该图片...',
        PictureId: 6,
      },
    },
  ],
},
];
