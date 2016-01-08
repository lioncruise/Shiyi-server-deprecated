'use strict';

module.exports = [{
  fileName: 'GET dailies',
  func: '获取日报内容，最多为5个',
  note: [
          '1.数组长度最大为5。',
          '2.可能包含Album或User，可能都包含，可能包含一个，也可能都不包含。',
          '3.如果包含Album，webview的菜单中需要显示：一键关注此相册、查看相册详情。',
          '4.如果包含User，webview的菜单中需要显示：一键关注此用户、查看用户详情。',
          '5.webview打开的地址是日报里面的url字段。',
          ],
  requests: [
    {
      method: 'get',
      url: '/dailies',
    },
  ],
},
];
