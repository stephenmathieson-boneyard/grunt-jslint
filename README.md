# grunt-jslint

Validates JavaScript files with JSLint

## Documentation
_(Coming soon)_

## Example Usage

	module.exports = function (grunt) {

		'use strict';

		grunt.loadNpmTasks('grunt-jslint'); // load the task

		grunt.initConfig({
			watch: {
				files: '<config:jslint.files>',
				tasks: 'jslint'
			},

			jslint: { // configure the task
				files: [ // some example files
					'grunt.js',
					'src/**/*.js'
				]
			},

			jslint_directives: { // example directives
				browser: true,
				unparam: true,
				todo: true,
				predef: [ // array of pre-defined globals
					'jQuery'
				]
			}
		});

		grunt.registerTask('default', 'server watch');
	};



## Release History
0.1.6 - Added an exclude option and added number of files in violation to standard output.

## License
Copyright (c) 2012 Stephen Mathieson
Licensed under the WTFPL license.
