test:
	node_modules/.bin/vows \
		test/*.js \
		--spec

test-cov: lib-cov
	JSLINT_COV=1 node_modules/.bin/vows \
		test/*.js \
		--cover-html
lib-cov:
	jscoverage lib lib-cov

lint:
	grunt jslint

.PHONY: test lint
