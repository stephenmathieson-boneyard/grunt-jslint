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

	var jslint, templateString, template,
		vm = require('vm'),
		fs = require('fs'),
		ctx = vm.createContext();

	templateString =  "<%= errors.length.toString().red %> JSLint violations in <%= filepath.yellow %>\n";
	templateString += "<% for (var i = 0, l = errors.length; i < l; i++) { %>";
	templateString += "<% if (errors[i]) { %>";

	templateString += "Error on line #";
	templateString += "<%= errors[i].line.toString() %>";

	templateString += "<% errors[i].character ? print(', character #' + errors[i].character) : '' %>";
	templateString += "<% errors[i].reason ? print(':' + errors[i].reason) : print(': Unused variable `' + errors[i].name + '`') %>";
	templateString += "\n";
	templateString += "<% } %>";
	templateString += "<% } %>";


	vm.runInContext(fs.readFileSync(__dirname + '/JSLint/jslint.js'), ctx);

	jslint = ctx.JSLINT;

	grunt.registerMultiTask('jslint', 'Validates JavaScript files with JSLint', function () {

		var options = grunt.config('jslint_options') || {},
			files = grunt.file.expandFiles(this.file.src),
			fileCount = files.length,
			errorCount = 0;

		files.forEach(function (filepath, foo) {
			var source = grunt.file.read(filepath),
				passed = jslint(source, options),
				data = jslint.data(),
				errors = [];

			if (!passed || (data.unused && data.unused.length)) {
				errors = errors.concat(jslint.errors);
				errors = errors.concat(data.unused);

				errorCount += errors.length;
				template = grunt.utils._.template(templateString);
				grunt.log.write(template({
					errors: errors,
					filepath: filepath
				}));
			}

		});

		if (errorCount) {
			grunt.log.writeln(errorCount.toString().red + ' JSLint violations in ' + fileCount.toString().yellow + ' files');
			return false;
		}
	});

};
