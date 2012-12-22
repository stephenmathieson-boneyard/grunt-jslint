#!/bin/sh

for test in test/*.js; do
	node $test
done