/*!
 * grunt-jslint
 * https://github.com/stephenmathieson/grunt-jslint
 *
 * Copyright (c) 2012 Stephen Mathieson
 * Licensed under the WTFPL license.
 */

/*jslint node:true*/
/*jslint nomen:true*/

var vm = require('vm');
var fs = require('fs');
var entities = require('entities');
var clone = require('clone');
var ctx = vm.createContext();

module.exports = function (grunt) {
	'use strict';

	var jslint,
		templates = {};

	vm.runInContext(grunt.file.read(__dirname + '/JSLint/jslint.js'), ctx);

	jslint = ctx.JSLINT;

	templates.standard = grunt.file.read(__dirname + '/templates/standard.tmpl');
	templates.errors_only = grunt.file.read(__dirname + '/templates/errors-only.tmpl');
	templates.junit = grunt.file.read(__dirname + '/templates/junit.tmpl');
	templates.jslint_xml = grunt.file.read(__dirname + '/templates/jslint-xml.tmpl');

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
	 * Checks to see if a thing is neither undefired nor null
	 *
	 * @param  {Mixed|Any}  thing The thing to check
	 * @return {Boolean}          True if the thing is either null or undefined
	 */
	function isDefined(thing) {
		return thing !== undefined && thing !== null;
	}

	/**
	 * The task
	 */
	grunt.registerTask('jslint', 'Validate JavaScript files with JSLint', function () {

		var template,
			files = conf('files'),
			excludedFiles = conf('exclude') || [],
			options = conf('options') || {},
			directives = conf('directives') || {},
			filesInViolation = 0,
			errorCount = 0,
			report = {
				files: []
			};

		if (!files) {
			grunt.log.error('NO FILES?!?');
			return false;
		}

		if (options.failOnError === undefined) {
			options.failOnError = true;
		}

		excludedFiles = grunt.file.expandFiles(excludedFiles);

		files = grunt.file.expandFiles(files).filter(function (file) {
			return excludedFiles.indexOf(file) === -1;
		});

		files.forEach(function (filepath, index) {

			var source = grunt.file.read(filepath),
				passed = jslint(source, directives),
				data = jslint.data(),
				errors = [],
				encodedErrors = [];


			errors = errors.concat(jslint.errors);
			if (!directives.unused) {
				errors = errors.concat(data.unused);
			}
			errors = errors.filter(isDefined);

			if (errors.length) {
				errorCount += errors.length;
				filesInViolation += 1;

				errors.forEach(function (error) {
					var encodedError = clone(error),
						evidence = error.evidence,
						reason = error.reason;

					encodedError.evidence = evidence ? entities.encode(evidence, 0) : evidence;
					encodedError.reason = reason ? entities.encode(reason, 0) : reason;
					encodedErrors.push(encodedError);
				});
			}

			report.files[index] = {
				filepath: filepath,
				passed: passed,
				errors: errors,
				encodedErrors: encodedErrors
			};

		});

		report.failures = errorCount;
		report.filesInViolation = filesInViolation;
		options.data = report;

		if (options.errorsOnly) {
			template = grunt.template.process(templates.errors_only, options);
		} else {
			template = grunt.template.process(templates.standard, options);
		}

		grunt.log.write(template);

		if (options.log) {
			grunt.file.write(options.log, grunt.log.uncolor(template));
		}

		if (options.junit) {
			template = grunt.template.process(templates.junit, options);

			grunt.file.write(options.junit, template);
		}

		if (options.jslintXml) {
			template = grunt.template.process(templates.jslint_xml, options);

			grunt.file.write(options.jslintXml, template);
		}

		if (errorCount && options.failOnError) {
			return false;
		}

	});

};
