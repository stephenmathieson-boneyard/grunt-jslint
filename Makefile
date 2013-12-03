
ACCEPTANCE_TESTS := $(wildcard test/acceptance/*.js)

test: test-acceptance
	node_modules/.bin/vows \
		test/*.js \
		--spec

test-cov: lib-cov
	JSLINT_COV=1 node_modules/.bin/vows \
		test/*.js \
		--cover-html

test-acceptance: $(ACCEPTANCE_TESTS)

$(ACCEPTANCE_TESTS):
	node $@
	@echo 'ok'

lib-cov:
	jscoverage lib lib-cov

lint:
	grunt jslint

clean:
	rm -rf lib-cov out

.PHONY: test lint test-cov clean $(ACCEPTANCE_TESTS) test-acceptance
