TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REGISTRY = http://registry.npm.taobao.net
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =

start:
	@node --harmony ./index.js

init:
	@node --harmony ./init/index.js

fake:
	@node --harmony ./fake/index.js

install:
	@npm install \
		--registry=$(REGISTRY)

jshint:
	@./node_modules/.bin/jshint .

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	  --harmony \
	  --bail \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		--require should \
		--require co-mocha \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov cov:
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

test-all: install jshint test cov

clean:
	@rm -rf node_modules
	@rm -rf coverage

autod: install
	@./node_modules/.bin/autod \
		-w \
		-f "~"
	@$(MAKE) install

.PHONY: start init fake install jshint test test-all test-cov cov clean autod