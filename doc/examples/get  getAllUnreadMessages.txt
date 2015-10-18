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
			"createdAt": "2015-10-18T14:36:13.187Z",
			"updatedAt": "2015-10-18T14:36:13.187Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 7,
			"Comment": {
				"id": 7,
				"content": "一条评论",
				"isBlocked": false,
				"isDeleted": false,
				"createdAt": "2015-10-18 14:36:13.184 +00:00",
				"updatedAt": "2015-10-18 14:36:13.184 +00:00",
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
				"isDeleted": false,
				"type": "user",
				"createdAt": "2015-10-18 14:36:11.541 +00:00",
				"updatedAt": "2015-10-18 14:36:12.848 +00:00"
			}
		},
		{
			"id": 6,
			"type": "C",
			"content": null,
			"createdAt": "2015-10-18T14:36:13.204Z",
			"updatedAt": "2015-10-18T14:36:13.204Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 8,
			"Comment": {
				"id": 8,
				"content": "二条评论",
				"isBlocked": false,
				"isDeleted": false,
				"createdAt": "2015-10-18 14:36:13.199 +00:00",
				"updatedAt": "2015-10-18 14:36:13.199 +00:00",
				"PictureId": null,
				"UserId": 1,
				"ActionId": 2,
				"OrignalCommentId": 1,
				"OrignalComment": {
					"id": 1,
					"content": "这是用户1对图片1的评论。",
					"isBlocked": false,
					"isDeleted": true,
					"createdAt": "2015-10-18 14:36:11.683 +00:00",
					"updatedAt": "2015-10-18 14:36:13.230 +00:00",
					"PictureId": 1,
					"UserId": 1,
					"ActionId": null,
					"OrignalCommentId": null
				}
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
				"isDeleted": false,
				"type": "user",
				"createdAt": "2015-10-18 14:36:11.541 +00:00",
				"updatedAt": "2015-10-18 14:36:12.848 +00:00"
			}
		},
		{
			"id": 7,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-18T14:36:13.273Z",
			"updatedAt": "2015-10-18T14:36:13.273Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 6,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 6,
				"type": "LL",
				"createdAt": "2015-10-18 14:36:13.268 +00:00",
				"updatedAt": "2015-10-18 14:36:13.268 +00:00",
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
				"isDeleted": false,
				"type": "user",
				"createdAt": "2015-10-18 14:36:11.541 +00:00",
				"updatedAt": "2015-10-18 14:36:12.848 +00:00"
			}
		},
		{
			"id": 8,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-18T14:36:13.301Z",
			"updatedAt": "2015-10-18T14:36:13.301Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 7,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 7,
				"type": "DD",
				"createdAt": "2015-10-18 14:36:13.295 +00:00",
				"updatedAt": "2015-10-18 14:36:13.295 +00:00",
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
				"isDeleted": false,
				"type": "user",
				"createdAt": "2015-10-18 14:36:11.541 +00:00",
				"updatedAt": "2015-10-18 14:36:12.848 +00:00"
			}
		}
	]
}