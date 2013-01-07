/*jslint node:true, es5:true*/

'use strict';
var ROOT = (function () {
	/*jslint nomen:true*/
	return __dirname;
}());

var path = require('path');

var vows = require('vows');

var assert = require('assert');

var runner = require('../lib/runner.js');

var reports = require('../lib/reports.js');

var suite = vows.describe('reporters');

//
// TODO
// - much better coverage
// - validate produced XML is parseable
// - validate each report contains correct number of errors
//

suite.addBatch({
	'standard': {
		topic: function () {
			var callback = this.callback,
				files = [
					path.join(ROOT, 'fixtures', 'sloppy.js'),
					path.join(ROOT, 'fixtures', 'white.js')
				];

			runner(files, {}, function (err, report) {
				callback(err, reports.standard(report));
			});
		},
		'should not have errored': function (err, result) {
			assert.ifError(err);
		},
		// extremely low coverage here...
		'should return a String': function (err, result) {
			assert.isString(result);
		}
	},
	'checkstyle': {
		topic: function () {
			var callback = this.callback,
				files = [
					path.join(ROOT, 'fixtures', 'sloppy.js'),
					path.join(ROOT, 'fixtures', 'white.js'),
					path.join(ROOT, 'fixtures', 'shebang')
				];

			runner(files, {}, function (err, report) {
				callback(err, reports.checkstyle(report));
			});
		},
		'should not have errored': function (err, result) {
			assert.ifError(err);
		},
		// extremely low coverage here...
		'should return a String': function (err, result) {
			assert.isString(result);
		}
	},
	'junit-xml': {
		topic: function () {
			var callback = this.callback,
				files = [
					path.join(ROOT, 'fixtures', 'sloppy.js'),
					path.join(ROOT, 'fixtures', 'white.js')
				];

			runner(files, {}, function (err, report) {
				callback(err, reports.junitXml(report));
			});
		},
		'should not have errored': function (err, result) {
			assert.ifError(err);
		},
		// extremely low coverage here...
		'should return a String': function (err, result) {
			assert.isString(result);
		}

	},
	'jslint-xml': {
		topic: function () {
			var callback = this.callback,
				files = [
					path.join(ROOT, 'fixtures', 'sloppy.js'),
					path.join(ROOT, 'fixtures', 'white.js')
				];

			runner(files, {}, function (err, report) {
				callback(err, reports.jslintXml(report));
			});
		},
		'should not have errored': function (err, result) {
			assert.ifError(err);
		},
		// extremely low coverage here...
		'should return a String': function (err, result) {
			assert.isString(result);
		}

	},
	'errors-only': {
		topic: function () {
			var callback = this.callback,
				files = [
					path.join(ROOT, 'fixtures', 'sloppy.js'),
					path.join(ROOT, 'fixtures', 'white.js')
				];

			runner(files, {}, function (err, report) {
				callback(err, reports.errorsOnly(report));
			});
		},
		'should not have errored': function (err, result) {
			assert.ifError(err);
		},
		// extremely low coverage here...
		'should return a String': function (err, result) {
			assert.isString(result);
		}

	}
});

suite.export(module);
