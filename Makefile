TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REGISTRY = http://registry.npm.taobao.org
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install \
		--registry=$(REGISTRY)

clean:
	@rm -rf node_modules
	@rm -rf coverage

cloc:
	@cloc --exclude-dir=node_modules,coverage,data,out .

.PHONY: install clean cloc
