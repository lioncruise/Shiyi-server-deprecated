数据交互操作数据流
========================

1. 新建相册

	post /albums

2. 添加一个新动态

	先post /actions拿到ActionId之后，再创建图片，每一张图片调用一次post /pictures接口，其中input中包括ActionId和AlbumId

3. 修改相册中的用户

	相册中添加用户post /albumUsers，其中包括AlbumId和UserId（如：1），或AlbumId和UserIds（如：1,2,3,4）。如果表中已经存在，再次重复添加，也不会报错。

	删除相册中的用户delete /albumUsers，规则和post相同。

4. 所有删除操作要求，只能删除创建人自己的相册、图片、动态、评论。
