shiyi-server
=============

开发细节文档在doc文件夹下，常用命令如下：

* make start

	（只运行这一条就对了）

	安装依赖 + 初始化项目 + 初始化数据库 + 填充数据 + 运行

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