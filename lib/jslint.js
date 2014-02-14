'use strict';

module.exports = {};

var fs = require('fs'),
  vm = require('vm'),
  path = require('path'),
  nodelint = require('jslint/lib/nodelint'),
  jslint = module.exports;

/**
 * The `JSLINT` function
 *
 * @api public
 * @param {String} source
 * @param {Object} options
 */
var JSLINT;

/**
 * Expose the current version of JSLint
 *
 * @api public
 * @type {String}
 */
jslint.edition = '';

/**
 * Load (or reload) the actual jslint linter module
 *
 * @api private
 * @param {String} edition
 */
function loadJSLint(edition, callback) {
  JSLINT = jslint.JSLINT = nodelint.load(edition);
  jslint.edition = JSLINT.edition;

  if (callback) {
    callback(null, jslint.edition);
  }
}
jslint.loadJSLint = loadJSLint;

loadJSLint('latest'); // default - can be overridden by setting 'edition' in grunt options


/**
 * Run `JSLINT` on the given `files`
 *
 * @api public
 * @param {Array} files
 * @param {Object} opts
 * @param {Function} cb
 */
jslint.runner = function (files, opts, cb) {
  var pending = files.length,
    report = {
      files: {},
      failures: 0,
      file_count: files.length,
      files_in_violation: 0
    },
    done = false;

  if (opts.edition) {
    loadJSLint(opts.edition);
  }

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
        report.files_in_violation += 1;
      }

      pending -= 1;
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
      // remove shebang lines for executable files
      //   e.g. `#!/usr/bin/env node`
      /*jslint regexp: true*/
      source = source.replace(/^\#\!.*/, '');
      /*jslint regexp: false*/
    }

    JSLINT(source, directives);

    var violations = JSLINT.errors,
      res = [];

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
