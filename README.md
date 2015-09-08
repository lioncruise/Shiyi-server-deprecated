shiyi-server
=============

开发细节文档在doc文件夹下，常用命令如下：


* make init
	
	初始化项目，初始化数据库
	
* make fake

	数据库中填充demo数据

* make install

	安装项目依赖库
	
* make start

	启动项目

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