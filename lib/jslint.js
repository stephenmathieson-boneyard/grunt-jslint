'use strict';

var fs = require('fs');
var vm = require('vm');
var path = require('path');

// define public API
var jslint = module.exports = {};

/**
 * The `JSLINT` function
 *
 * @api public
 * @param {String} source
 * @param {Object} options
 */
var JSLINT = jslint.JSLINT = (function () {
  var file = path.join(__dirname, '..', 'jslint', 'jslint.js');
  var ctx = vm.createContext();
  var js = fs.readFileSync(file).toString();

  vm.runInContext(js, ctx);
  return ctx.JSLINT;
}());

/**
 * Expose the current version of JSLint
 *
 * @api public
 * @type {String}
 */
jslint.edition = JSLINT.edition;

/**
 * Run `JSLINT` on the given `files`
 *
 * @api public
 * @param {Array} files
 * @param {Object} opts
 * @param {Function} cb
 */
jslint.runner = function (files, opts, cb) {
  var pending = files.length;
  var report = {
    files: {},
    failures: 0,
    file_count: files.length,
    files_in_violation: 0
  };
  var done = false;

  files.forEach(function (file) {
    jslint.validate(file, opts, function (err, violations) {
      if (done) { return; }

      if (err) {
        done = true;
        return cb(err);
      }

      report.files[file] = violations;

      if (violations.length) {
        report.failures += violations.length;
        report.files_in_violation++;
      }

      pending--;
      if (!pending) {
        done = true;
        cb(null, report);
      }
    });
  });
};

/**
 * Run `JSLINT` on the given `file`
 *
 * @api public
 * @param {String} files
 * @param {Object} opts
 * @param {Function} cb
 */
jslint.validate = function (file, opts, cb) {
  var directives = opts.directives || {};

  // `predef` is obnoxious
  if (directives.globals) {
    directives.predef = directives.globals;
    delete directives.globals;
  }

  fs.readFile(file, 'utf8', function (err, source) {
    if (err) {
      return cb(err);
    }

    if (opts.shebang) {
      // remove shebang lines for binary files
      //   e.g. `#!/usr/bin/env node`
      source = source.replace(/^\#\!.*/, '');
    }

    JSLINT(source, directives);

    var violations = JSLINT.errors;
    var res = [];

    violations.forEach(function (violation) {
      if (!violation) {
        return;
      }

      violation.file = file;
      res.push(violation);
    });

    return cb(null, res);
  });
};

/**
 * All available reporters
 *
 * @api private
 * @type {Object}
 */
jslint.reporters = require('./reporters');
