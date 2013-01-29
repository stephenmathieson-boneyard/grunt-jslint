# grunt-jslint

Validates JavaScript files with [JSLint](https://github.com/douglascrockford/JSLint) as a [grunt](https://github.com/cowboy/grunt) task.

## Installation
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-jslint`

Then add this line to your project's gruntfile:

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
		<b>options</b> - Configuration options/settings for the plugin itself.  Currently supports the following:

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
			<li>
				<b>jslintXml</b> - A String/filepath option which, when provided, tells the plugin where to write a JSLint-style XML file to.
			</li>
			<li>
				<b>failOnError</b> - A Boolean option - defaults to <code>true</code>; when set to <code>false</code>, grunt will not fail if JSLint detects an error.
			</li>
			<li>
				<b>checkstyle</b> - A String/filepath option which, when provided, tells the plugin where to write a CheckStyle-XML file to.
			</li>
			<li>
				<b>shebang</b> - Ignore shebang lines (`#!/usr/bin/whatever`) from files
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
				jslintXml: 'out/jslint_xml.xml',
				errorsOnly: true, // only display errors
				failOnError: false, // defaults to true
				shebang: true, // ignore shebang lines
				checkstyle: 'out/checkstyle.xml' // write a checkstyle-XML
			}
		}

	});

	grunt.registerTask('default', 'watch');
};
```

## Contributing

All files should be validated with JSLint.  Bug fixes and/or new features must be accompanied by a passing test.  Tests are written with [vows](http://vowsjs.org/).

### Validating coding style

Run `grunt jslint` in the root of your repository.

### Running the tests

Run `./test.sh` in the root of your repository.

## TODOs

- better test coverage
- test-runner for Windows

## Release History


### 0.2.5

- Fixed `failOnError` bug (@glan)
- Fixed JSLint XML bug (@glan)
- Another grunt 0.4.x support bug (@glan)
- Bug fix for XML reports (non-escaped characters)
- Added checkstyle XML reporting
- Added `shebang` option
- Improved test coverage

### 0.2.4

- Re-factor everything, allowing for a test suite to be created
- Updated the outputted JUnit-style XML for better intergration with Jenkins per @sbrandwoo
- Removed unecessary dependencies

### 0.2.3-1

- Fix for bad template processing; thanks to @sbrandwoo

### 0.2.3

- Adding support for Grunt *0.4.x* by using [underscore's templating engine](http://underscorejs.org/#template), rather than Grunt's version of it
- Updated JSLint to edition **2012-12-04**

### 0.2.2-1

- Updating JSLint to "edition" **2012-11-17**

### 0.2.2

- Adding option to not cause Grunt to fail if a violation is detected

### 0.2.1

- Added JSLint XML output for [Jenkins Violations Plugin](https://github.com/jenkinsci/violations-plugin)

### 0.2.0

- Cleaned up your `grunt.js` file for you - moved all options into the `jslint` object

### 0.1.8

- Updating README.md to contain more verbose documentation
- Adding keywords to package.json

### 0.1.7

- Added an option to only report on errors

### 0.1.6

- Added an exclude option
- Added number of files in violation to standard output


## License
Copyright (c) 2012 Stephen Mathieson
Licensed under the WTFPL license.
