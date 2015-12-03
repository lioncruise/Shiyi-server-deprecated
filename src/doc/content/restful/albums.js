'use strict';

module.exports = [{
  fileName: 'GET albums :id',
  func: '获取某个相册信息',
  note: [
          '1.可加 isWithMemories=true 参数，在返回内容中添加 相册中的记忆 内容。',
          '2.可加 isWithPictures=true 参数，在返回内容中添加 相册中的图片 内容。',
          '3.可加 isWithUser=true 参数，在返回内容中添加 相册的创建者信息 内容。',
          '4.可加 isWithCollaborators=true 参数，在返回内容中添加 相册的维护者（加入相册的人）的信息 内容。',
          '5.可添加offset和limit控制Memories、Pictures的返回，offset默认为0，limit最大为50。',
          '6.isWithMemories和isWithPictures不要同时添加，涉及到大量查表操作。',
          '7.相册的基本信息里面，含有collaborators和fans的数量。',
          '8.如果isWithMemories=true的同时isWithMemoriesDetails=true，则返回详细的记忆信息，包括每一条记忆的评论、点赞详情。',
          ],
  requests: [
    {
      method: 'get',
      url: '/albums/2',
    }, {
      method: 'get',
      url: '/albums/2?isWithMemories=true',
    }, {
      method: 'get',
      url: '/albums/2?isWithMemories=true&isWithMemoriesDetails=true',
    }, {
      method: 'get',
      url: '/albums/1?isWithPictures=true',
    }, {
      method: 'get',
      url: '/albums/1?isWithUser=true',
    }, {
      method: 'get',
      url: '/albums/1?isWithCollaborators=true',
    }, {
      method: 'get',
      url: '/albums/1?isWithPictures=true&offset=0&limit=10',
    },
  ],
}, {
  fileName: 'POST albums',
  func: '新建一个相册',
  note: [
          '1.isPublic的值为private, shared, public中一个。可以不包含这个字段，默认值为shared。',
          '2.allowComment的值为none, collaborators, anyone中的一个。可以不包含这个字段，默认值为collaborators。',
          '3.可以不包含coverStoreKey这个字段，默认值为default。',
          '4.如果创建公开相册，会创建一条action。',
          ],
  requests: [
  {
    method: 'post',
    url: '/albums',
    data: {
      title: '每日搞笑一图',
      description: '每天笑一笑',
      tags: '搞笑,每日',
      coverStoreKey: '123.jpg',
      isPublic: 'public',
      allowComment: 'collaborators',
    },
  },
  ],
}, {
  fileName: 'PUT albums :id',
  func: '更新某个相册信息',
  note: [
          '1.增量更新：只需要提交希望更新的字段，不需要更新的字段，可以不提交。',
          '2.用户只能更新自己的相册信息。',
          '3.如果相册从非公开变成公开，会创建一条action。',
          ],
  requests: [
  {
    method: 'put',
    url: '/albums/2',
    data: {
      title: '我的相册',
      description: '记录我的生活',
      coverStoreKey: '123.jpg',
      tags: '我,快乐,生活',
      isPublic: 'public',
      allowComment: 'anyone',
    },
  },
  ],
},  {
  fileName: 'DELETE albums :id',
  func: '删除某个相册',
  note: [
          '1.删除相册会一起删除所有相册里的信息，包括相册里所有的memroy,action,picutre,like,comment，一定提醒用户需要注意这个操作！',
          '2.只有相册的主人可以删除相册。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/albums/3',
  },
  ],
},
];
