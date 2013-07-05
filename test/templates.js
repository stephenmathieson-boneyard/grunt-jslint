/*jslint node:true, es5:true*/
/*jslint unparam: true, indent: 2 */

'use strict';
var ROOT = (function () {
  /*jslint nomen:true*/
  return __dirname;
}());

var path = require('path');

var vows = require('vows');

var assert = require('assert');

var suite = vows.describe('templates');

suite.addBatch({
  'sanity': {
    topic: function () {
      return require('../lib/runner').reporters;
    },
    'should be an object': function (templates) {
      assert.isObject(templates);
    },
    'should have multiple keys': function (templates) {
      assert.ok(Object.keys(templates).length);
    },
    'should contain an "errorsOnly" template': function (templates) {
      assert.include(templates, 'errorsOnly');
    },
    'should contain an "standard" template': function (templates) {
      assert.include(templates, 'standard');
    },
    'should contain an "jslint" template': function (templates) {
      assert.include(templates, 'jslint');
    },
    'should contain a "checkstyle" template': function (templates) {
      assert.include(templates, 'checkstyle');
    },
    'should contain an "junit" template': function (templates) {
      assert.include(templates, 'junit');
    }
  }
});

suite.export(module);
