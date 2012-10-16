# grunt-jslint

Validates JavaScript files with [JSLint](https://github.com/douglascrockford/JSLint) as a [grunt](https://github.com/cowboy/grunt) task.

## Installation
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jslint`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-jslint');
```

[npm_registry_page]: http://search.npmjs.org/#/grunt-jslint
[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

A single-task to validate your JavaScript files with JSLint.

Supports the following options:


<ul>
	<li>
		<b>files</b> - An array of files or <a href="https://github.com/gruntjs/grunt/blob/master/docs/api_file.md#file-lists-and-wildcards">wildcards</a> which you want to be validated with JSLint.
	</li>

	<li>
		<b>exclude</b> - A String/filepath/wildcard option which, when provided, tells the plugin which files should be ignored (not scanned).
	</li>

	<li>
		<b>directives</b> - Configuration options/settings to pre-define in JSLint.  Pre-defined globals are included within this object as <code>predef: ['myglobal']</code>
	</li>

	<li>
		<b>Options</b> - Configuration options/settings for the plugin itself.  Currently supports the following:

		<ul>
			<li>
				<b>errorsOnly</b> - A Boolean option which tells the plugin to only display errors when set to <code>true</code>.
			</li>
			<li>
				<b>log</b> - A String/filepath option which, when provided, tells the plugin where to write a verbose log to.
			</li>
			<li>
				<b>junit</b> - A String/filepath option which, when provided, tells the plugin where to write a JUnit-style XML file to.
			</li>

		</ul>

	</li>
</ul>


## Example Usage
```javascript
/*jslint node:true*/

module.exports = function (grunt) {

	'use strict';

	grunt.loadNpmTasks('grunt-jslint'); // load the task

	grunt.initConfig({
		watch: {
			files: '<config:jslint.files>',
			tasks: 'jslint'
		},

		// TAKE NOTE - this has changed since 0.1.8

		jslint: { // configure the task
			files: [ // some example files
				'grunt.js',
				'src/**/*.js'
			],
			exclude: [
				'**/ignore-*.js',
				'bananas.js'
			],
			directives: { // example directives
				browser: true,
				unparam: true,
				todo: true,
				predef: [ // array of pre-defined globals
					'jQuery'
				]
			},
			options: {
				junit: 'out/junit.xml', // write the output to a JUnit XML
				log: 'out/lint.log',
				errorsOnly: true // only display errors
			}
		}

	});

	grunt.registerTask('default', 'watch');
};
```


## Release History
* 0.2.0 - Cleaned up your `grunt.js` file for you - moved all options into the `jslint` object
* 0.1.8 - Updating README.md to contain more verbose documentation, adding keywords to package.json
* 0.1.7 - Added an option to only report on errors
* 0.1.6 - Added an exclude option and added number of files in violation to standard output.

## License
Copyright (c) 2012 Stephen Mathieson
Licensed under the WTFPL license.
