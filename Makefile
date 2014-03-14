
JSCOVERAGE ?= jscoverage
BINS ?= ./node_modules/.bin
VOWS_REPORTER ?= spec

SRC = index.js
SRC += $(wildcard lib/*.js)
SRC += $(wildcard tasks/*.js)
TESTS = $(wildcard test/*.js)
ACCEPTANCE_TESTS := $(wildcard test/acceptance/*.js)

test: node_modules test-acceptance
	$(BINS)/vows --$(VOWS_REPORTER) $(TESTS)

node_modules: package.json
	@npm install

test-acceptance: $(ACCEPTANCE_TESTS)
$(ACCEPTANCE_TESTS):
	@node $@
	@echo 'ok'

lint:
	@$(BINS)/grunt jslint

coverage.html: lib-cov $(TESTS)
	JSLINT_COV=1 VOWS_REPORTER=cover-html $(MAKE) test

lib-cov: $(SRC)
	@rm -rf $@
	$(JSCOVERAGE) lib $@

clean:
	rm -rf lib-cov out coverage.html

.PHONY: test lint clean
