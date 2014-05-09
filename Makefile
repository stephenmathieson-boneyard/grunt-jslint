
ifeq ($(OS),Windows_NT)
	SHELL = C:/Windows/System32/cmd.exe
endif

JSCOVERAGE ?= jscoverage
BINS ?= ./node_modules/.bin
VOWS_REPORTER ?= spec

SRC = index.js
SRC += $(wildcard lib/*.js)
SRC += $(wildcard tasks/*.js)
TESTS = $(wildcard test/*.js)
EXAMPLES = $(wildcard examples/*)
ACCEPTANCE_TESTS = $(addprefix test/acceptance/, $(notdir $(EXAMPLES)))

test: node_modules test-unit test-acceptance

node_modules: package.json
	@npm install

test-unit:
	"$(BINS)/vows" --$(VOWS_REPORTER) $(TESTS)

test-acceptance: $(ACCEPTANCE_TESTS)
$(ACCEPTANCE_TESTS):
	node $@
	@echo ok

lint:
	@$(BINS)/grunt jslint

coverage.html: lib-cov $(TESTS)
	JSLINT_COV=1 VOWS_REPORTER=cover-html $(MAKE) test

lib-cov: $(SRC)
	@rm -rf $@
	$(JSCOVERAGE) lib $@

clean:
	rm -rf lib-cov out coverage.html

.PHONY: test lint clean test-acceptance $(ACCEPTANCE_TESTS)
