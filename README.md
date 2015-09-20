shiyi-server
=============

开发细节文档在doc文件夹下，常用命令如下：

* make start (windows下运行 npm run start)

	（只运行这一条就对了）

	安装依赖 + 初始化项目 + 初始化数据库 + 填充数据 + 运行

* make dev

	启动后台文件监听，文件更新，自动重启服务器

* make authdev

	make dev + 所以接口不进行用户auth验证，全部默认为用户id为1的用户发送请求

* make init

	初始化项目，初始化数据库

* make fake

	数据库中填充demo数据

* make install

	安装项目依赖库

* make jshint

	js语法检测

* make test

	跑测试用例

* make test-cov、make cov

	跑测试用例，输出覆盖率文件

* make test-all

	make install + make jshint + make test + make cov

* make autod

	自动更新依赖