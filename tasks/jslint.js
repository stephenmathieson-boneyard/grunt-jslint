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

	vm.runInContext(fs.readFileSync(__dirname + '/lib/jslint.js'), ctx);

	jslint = ctx.JSLINT;

	grunt.registerMultiTask('jslint', 'Validates JavaScript files with JSLint', function () {

		var options = grunt.config('jslint_options') || {},
			files = grunt.file.expandFiles(this.file.src),
			fileCount = files.length;

		files.forEach(function (filepath) {
			var source = grunt.file.read(filepath);

			if (!jslint(source, options)) {

				grunt.log.writeln(jslint.errors.length.toString().red + ' JSLint violations in `' + filepath.yellow + '`');

				jslint.errors.forEach(function (lintError) {

					if (lintError !== null) {
						var message = 'Error on line ' + (lintError.line || 'unknown').toString();
						message += ', character ' + (lintError.character || '').toString();
						message += ': ' + (lintError.reason || '').red;

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
