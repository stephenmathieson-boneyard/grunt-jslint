'use strict';

var path = require('path'),
  vows = require('vows'),
  assert = require('assert');

var validate = require('..').validate,
  suite = vows.describe('validate');

suite.addBatch({

  'predef -> globals': {
    'with directives.globals': {
      topic: function () {
        var file = path.join(__dirname, 'fixtures', 'globals.js'),
          opts = {
            directives: {
              globals: [ 'someglobal' ]
            }
          };

        validate(file, opts, this.callback);
      },
      'should not error': function (err, report) {
        assert.ifError(err);
      },
      'should not pass violations': function (err, report) {
        assert.lengthOf(report, 0);
      }
    },
    'without directives.globals': {
      topic: function () {
        var file = path.join(__dirname, 'fixtures', 'globals.js');

        validate(file, {}, this.callback);
      },
      'should not error': function (err, report) {
        assert.ifError(err);
      },
      'should pass a global violation': function (err, report) {
        var violation = report[0];

        assert.equal(violation.reason, '\'someglobal\' was used before it was defined.');
      }
    }
  },

  'no directives': {
    topic: function () {
      var file = path.join(__dirname, 'fixtures', 'white.js');
      validate(file, {}, this.callback);
    },
    'should not error': function (err, report) {
      assert.ifError(err);
    },
    'should pass an Array of issues': function (err, report) {
      assert.isArray(report);
      assert.ok(report.length);
    },
    'should contain required issue properties': function (err, report) {
      report.forEach(function (issue) {
        assert.ok(issue.id);
        assert.ok(issue.raw);
        assert.ok(issue.evidence);
        assert.ok(issue.line);
        assert.ok(issue.character);
        assert.ok(issue.reason);
        assert.ok(issue.file);
      });
    },
    'should report at least 9 issues': function (err, report) {
      // as of 12-21-12, there are 12 issues in this file.  i'm not
      // directly testing each issue, because i believe jslint works as
      // expected.  also, crockford may decide to change his mind
      // regarding one or more of the reported issues in this file.
      assert.ok(report.length >= 9);
    }
  },
  'directives:': {
    'white': {
      topic: function () {
        var file = path.join(__dirname, 'fixtures', 'white.js');
        validate(file, {
          'directives': {
            'white': true
          }
        }, this.callback);
      },
      'should not error': function (err, report) {
        assert.ifError(err);
      },
      'should pass an empty Array': function (err, report) {
        assert.isArray(report);
        assert.lengthOf(report, 0);
      }
    },
    'sloppy': {
      topic: function () {
        var file = path.join(__dirname, 'fixtures', 'sloppy.js');
        validate(file, {
          'directives': {
            'sloppy': true
          }
        }, this.callback);
      },
      'should not error': function (err, report) {
        assert.ifError(err);
      },
      'should pass an empty Array': function (err, report) {
        assert.isArray(report);
        assert.lengthOf(report, 0);
      }
    }
  },
  'shebang option': {
    topic: function () {
      var file = path.join(__dirname, 'fixtures', 'shebang');
      validate(file, { shebang: true }, this.callback);
    },
    'should not error': function (err, report) {
      assert.ifError(err);
    },
    'should pass an empty Array': function (err, report) {
      assert.isArray(report);
      assert.lengthOf(report, 0);
    }
  },
  'missing file': {
    topic: function () {
      validate('cats and dogs', {}, this.callback);
    },
    'should error': function (err, report) {
      assert.ok(err instanceof Error);
    }
  }
});

suite.export(module);
