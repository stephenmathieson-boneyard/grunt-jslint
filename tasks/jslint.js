/*!
 * grunt-jslint
 * https://github.com/stephenmathieson/grunt-jslint
 *
 * Copyright (c) 2012 Stephen Mathieson
 * Licensed under the WTFPL license.
 */

/*jslint node:true*/
/*jslint stupid:true*/
/*jslint nomen:true*/

module.exports = function (grunt) {
	'use strict';

	var jslint, template, templateString, jUnitTemplate,
		vm = require('vm'),
		fs = require('fs'),
		ctx = vm.createContext();

	/**
	 * Checks to see if a thing is neither undefired nor null
	 * @param  {Mixed|Any}  thing The thing to check
	 * @return {Boolean}          True if the thing is either null or undefined
	 */
	function isDefined(thing) {
		return thing !== undefined && thing !== null;
	}

	templateString = grunt.file.read(__dirname + '/templates/standard.tmpl');


	vm.runInContext(fs.readFileSync(__dirname + '/JSLint/jslint.js'), ctx);

	jslint = ctx.JSLINT;

	grunt.registerMultiTask('jslint', 'Validates JavaScript files with JSLint', function () {

		var exclude = [],
			directives = grunt.config('jslint_directives') || {},
			options = grunt.config('jslint_options') || {},
			files = grunt.file.expandFiles(this.file.src),
			fileCount = files.length,
			filesInViolation = 0,
			errorCount = 0,
			report = {
				files: []
			};

		if (options.exclude) {
			exclude = grunt.file.expandFiles(options.exclude);
		}

		files.forEach(function (filepath, index) {
			var source = grunt.file.read(filepath),
				passed = jslint(source, directives),
				data = jslint.data(),
				errors = [];

			if (exclude.indexOf(filepath) !== -1) {
				return;
			}

			errors = errors.concat(jslint.errors);
			if (!directives.unused) {
				errors = errors.concat(data.unused);
			}
			errors = errors.filter(isDefined);

			if (errors.length) {
				errorCount += errors.length;
				filesInViolation += 1;
			}
			report.files[index] = {
				filepath: filepath,
				passed: passed,
				errors: errors
			};

		});

		report.failures = errorCount;
		report.filesInViolation = filesInViolation;

		template = grunt.template.process(templateString, report);

		grunt.log.write(template);

		if (options.log) {
			grunt.file.write(options.log, grunt.log.uncolor(template));
		}

		if (options.junit) {

			jUnitTemplate = grunt.file.read(__dirname + '/templates/junit.tmpl');
			template = grunt.template.process(jUnitTemplate, report);

			grunt.file.write(options.junit, template);
		}

		if (errorCount) {
			return false;
		}

	});

};
