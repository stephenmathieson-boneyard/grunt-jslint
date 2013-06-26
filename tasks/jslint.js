/*!
 * grunt-jslint
 * https://github.com/stephenmathieson/grunt-jslint
 *
 * Copyright (c) 2012 Stephen Mathieson
 * Licensed under the WTFPL license.
 */

/*jslint node:true*/

'use strict';

var reports = require('../lib/reports'),
  runner = require('../lib/runner');

module.exports = function (grunt) {

  /**
   * Takes the config / options from the single or multi task
   * and does the body of the work
   *
   * @param {Function} next           async handler
   * @param {Array} files             src files
   * @param {Array} excludedFiles     files to exclude
   * @param {Object} options          The option key-value array
   * @param {Object} directives       JSLint directives
   */
  function task(next, files, excludedFiles, options, directives) {
    if (!files) {
      grunt.log.error('NO FILES?!?');
      return false;
    }

    if (options.failOnError === undefined) {
      options.failOnError = true;
    }
    excludedFiles = grunt.file.expand(excludedFiles);

    files = grunt.file
      .expand(files)
      .filter(function (file) {
        return excludedFiles.indexOf(file) === -1;
      });

    options.directives = directives;

    runner(files, options, function (err, report) {

      var template;

      if (err) {
        grunt.log.error(err);
        return next(false);
      }

      if (options.errorsOnly) {
        template = reports.errorsOnly(report);
      } else {
        template = reports.standard(report);
      }

      if (options.log) {
        grunt.file.write(options.log, grunt.log.uncolor(template));
      }

      if (options.junit) {
        grunt.file.write(options.junit, reports.junitXml(report));
      }

      if (options.jslintXml) {
        grunt.file.write(options.jslintXml, reports.jslintXml(report));
      }

      if (options.checkstyle) {
        grunt.file.write(options.checkstyle, reports.checkstyle(report));
      }

      if (grunt.option('no-color')) {
        template = grunt.log.uncolor(template);
      }

      grunt.log.write(template);

      if (report.failures && options.failOnError) {
        next(false);
      } else {
        next(true);
      }
    });
  }

  /**
   * Grabs a config option from the jslint namespace
   *
   * @param  {String} option The option/configuration key
   * @return {Mixed|Any}     The key's value
   */
  function conf(option) {
    return grunt.config('jslint.' + option);
  }

  /**
   * The task
   */
  grunt.registerTask('jslint', 'Validate JavaScript files with JSLint', function () {

    var next = this.async(),
      files = conf('files'),
      excludedFiles = conf('exclude') || [],
      options = conf('options') || {},
      directives = conf('directives') || {};

    task(next, files, excludedFiles, options, directives);
  });

  /**
   * The task
   */
  grunt.registerMultiTask('jslintm', 'Validate JavaScript files with JSLint', function () {
    var next = this.async(),
      files = this.filesSrc,
      excludedFiles = this.data.exclude || [],
      options = this.data.options || {},
      directives = this.data.directives || {};

    task(next, files, excludedFiles, options, directives);
  });

};
