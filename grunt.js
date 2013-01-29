/*jslint node:true*/
module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		watch: {
			files: '<config:jslint.files>',
			tasks: 'default'
		},

		test: {
			files: ['test/**/*.js']
		},

		jslint: {
			files: [ // some example files
				'grunt.js',
				'lib/**/*.js',
				'tasks/jslint.js',
				'test/*.js'
			],
			directives: { // some example JSLint directives
				unused: true, // pseudo-directive, will report unused variables
				todo: true
			},
			options: {
				junit: 'out/junit.xml',
				jslintXml: 'out/jslint_xml.xml',
				log: 'out/lint.log',
				errorsOnly: false,
				checkstyle: 'out/checkstyle.xml',
				failOnError: true // default
			}
		}

	});

	// Load local tasks.
	grunt.loadTasks('./tasks');

	// Default task.
	grunt.registerTask('default', 'jslint');

};
