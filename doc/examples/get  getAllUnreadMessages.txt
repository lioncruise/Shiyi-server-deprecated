url: '/getAllUnreadMessages'

method: 'get'



output: 
{
	"statusCode": 200,
	"data": [
		{
			"id": 5,
			"type": "C",
			"content": null,
			"createdAt": "2015-10-22T05:14:01.892Z",
			"updatedAt": "2015-10-22T05:14:01.892Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 7,
			"Comment": {
				"id": 7,
				"content": "一条评论",
				"isBlocked": false,
				"createdAt": "2015-10-22 05:14:01.888 +00:00",
				"updatedAt": "2015-10-22 05:14:01.888 +00:00",
				"deletedAt": null,
				"PictureId": 4,
				"UserId": 1,
				"ActionId": 1,
				"OrignalCommentId": null,
				"OrignalComment": null
			},
			"Like": null,
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-22 05:13:59.837 +00:00",
				"updatedAt": "2015-10-22 05:14:01.347 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 6,
			"type": "C",
			"content": null,
			"createdAt": "2015-10-22T05:14:01.909Z",
			"updatedAt": "2015-10-22T05:14:01.909Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 8,
			"Comment": {
				"id": 8,
				"content": "二条评论",
				"isBlocked": false,
				"createdAt": "2015-10-22 05:14:01.905 +00:00",
				"updatedAt": "2015-10-22 05:14:01.905 +00:00",
				"deletedAt": null,
				"PictureId": null,
				"UserId": 1,
				"ActionId": 2,
				"OrignalCommentId": 1,
				"OrignalComment": null
			},
			"Like": null,
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-22 05:13:59.837 +00:00",
				"updatedAt": "2015-10-22 05:14:01.347 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 7,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-22T05:14:01.963Z",
			"updatedAt": "2015-10-22T05:14:01.963Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 6,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 6,
				"type": "LL",
				"createdAt": "2015-10-22 05:14:01.959 +00:00",
				"updatedAt": "2015-10-22 05:14:01.959 +00:00",
				"ActionId": null,
				"PictureId": 4,
				"UserId": 1
			},
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-22 05:13:59.837 +00:00",
				"updatedAt": "2015-10-22 05:14:01.347 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 8,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-22T05:14:01.995Z",
			"updatedAt": "2015-10-22T05:14:01.995Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 7,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 7,
				"type": "DD",
				"createdAt": "2015-10-22 05:14:01.987 +00:00",
				"updatedAt": "2015-10-22 05:14:01.987 +00:00",
				"ActionId": 2,
				"PictureId": null,
				"UserId": 1
			},
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-22 05:13:59.837 +00:00",
				"updatedAt": "2015-10-22 05:14:01.347 +00:00",
				"deletedAt": null
			}
		}
	]
}