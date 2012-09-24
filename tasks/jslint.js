/*!
 * grunt-jslint
 * https://github.com/stephenmathieson/grunt-jslint
 *
 * Copyright (c) 2012 Stephen Mathieson
 * Licensed under the MIT license.
 */

/*jslint node:true*/
/*jslint stupid:true*/
/*jslint nomen:true*/

module.exports = function (grunt) {
	'use strict';

	var jslint,
		vm = require('vm'),
		fs = require('fs'),
		ctx = vm.createContext();

	vm.runInContext(fs.readFileSync(__dirname + '/JSLint/jslint.js'), ctx);

	jslint = ctx.JSLINT;

	grunt.registerMultiTask('jslint', 'Validates JavaScript files with JSLint', function () {

		var options = grunt.config('jslint_options') || {},
			files = grunt.file.expandFiles(this.file.src),
			fileCount = files.length;

		files.forEach(function (filepath, foo) {
			var source = grunt.file.read(filepath),
				passed = jslint(source, options),
				data = jslint.data(),
				errors = [];

			if (!passed || (data.unused && data.unused.length)) {
				errors = errors.concat(jslint.errors);
				errors = errors.concat(data.unused);

				grunt.log.writeln(errors.length.toString().red + ' JSLint violations in ' + filepath.yellow);

				errors.forEach(function (lintError) {
					if (lintError !== null) {
						var message,
							reason = lintError.reason;

						if (reason === undefined) {
							reason = 'Unused variable `' + lintError.name + '`';
						}

						message = 'Error on line #';
						message += lintError.line.toString();
						message += ': ' + reason;
						grunt.log.error(message);
					}
				});
			}

		});

		if (this.errorCount) {
			grunt.log.writeln(this.errorCount.toString().red + ' JSLint violations in ' + fileCount.toString().yellow + ' files');
			return false;
		}
	});

};
