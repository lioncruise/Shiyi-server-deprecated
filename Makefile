TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REGISTRY = http://registry.npm.taobao.org
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

install:
	@npm install \
		--registry=$(REGISTRY)

test: fake
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--bail \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		--require co-mocha \
		$(MOCHA_OPTS) \
		$(TESTS)

cov: fake
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover --preserve-comments \
		./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		--require co-mocha \
		$(MOCHA_OPTS) \
		$(TESTS)

clean:
	@rm -rf node_modules
	@rm -rf coverage

cloc:
	@cloc --exclude-dir=node_modules,coverage,data,out .

.PHONY: install test cov clean
