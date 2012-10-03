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

### jslint

The multitask, responsible for running JSLint.  The task accepts a single option (property), **files**.

The files property is an array of files or [wildcards](https://github.com/gruntjs/grunt/blob/master/docs/api_file.md#file-lists-and-wildcards) which you want to be validated with JSLint.

### jslint_directives

Configuration options/settings to pre-define in JSLint.

Sample directives:

```javascript
browser: true,
unparam: true,
predef: [ // functionally the same thing as /*global myGlobal:true, anotherGlobal:true*/
	'myGlobal',
	'anotherGlobal'
]
```

### jslint_options

Configuration options/settings for the plugin itself.

Currently supported options include:

* **errorsOnly** - A Boolean option which tells the plugin to only display errors when set to ```true```.
* **log** - A String/filepath option which, when provided, tells the plugin where to write a verbose log to.
* **junit** - A String/filepath option which, when provided, tells the plugin where to write a JUnit-style XML file to.
* **exclude** - A String/filepath/wildcard option which, when provided, tells the plugin which files should be ignored (not scanned).

## Example Usage
```javascript
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
		},

		jslint_options: {
			junit: 'out/junit.xml', // write the output to a JUnit XML
			log: 'out/lint.log',
			errorsOnly: true // only display errors
		}

	});

	grunt.registerTask('default', 'server watch');
};
```


## Release History
* 0.1.8 - Updating README.md to contain more verbose documentation, adding keywords to package.json
* 0.1.7 - Added an option to only report on errors
* 0.1.6 - Added an exclude option and added number of files in violation to standard output.

## License
Copyright (c) 2012 Stephen Mathieson
Licensed under the WTFPL license.
