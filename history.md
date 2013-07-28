# Release History

## 1.0.0

- Moved to a [multi-task](http://gruntjs.com/creating-tasks#multi-tasks), allowing multiple groupings of files to be linted
- Allowing the usage of `globals` rather than `predef`
- Refactored entire project

## 0.2.6

- Updated [JSLint to edition 2013-05-16](https://github.com/douglascrockford/JSLint/commit/1d8c1f8f7410b505ccbb039a74025cd75a926ce3) per [#25](https://github.com/stephenmathieson/grunt-jslint/issues/25)
- Added a Makefile and replaced *test.sh*

## 0.2.5a

- Make [grunt](http://gruntjs.com/) a devDependency to speed up `npm install` time

## 0.2.5

- Fixed `failOnError` bug (@glan)
- Fixed JSLint XML bug (@glan)
- Another grunt 0.4.x support bug (@glan)
- Bug fix for XML reports (non-escaped characters)
- Added checkstyle XML reporting
- Added `shebang` option
- Improved test coverage

## 0.2.4

- Re-factor everything, allowing for a test suite to be created
- Updated the outputted JUnit-style XML for better intergration with Jenkins per @sbrandwoo
- Removed unecessary dependencies

## 0.2.3-1

- Fix for bad template processing; thanks to @sbrandwoo

## 0.2.3

- Adding support for Grunt *0.4.x* by using [underscore's templating engine](http://underscorejs.org/#template), rather than Grunt's version of it
- Updated JSLint to edition **2012-12-04**

## 0.2.2-1

- Updating JSLint to "edition" **2012-11-17**

## 0.2.2

- Adding option to not cause Grunt to fail if a violation is detected

## 0.2.1

- Added JSLint XML output for [Jenkins Violations Plugin](https://github.com/jenkinsci/violations-plugin)

## 0.2.0

- Cleaned up your `grunt.js` file for you - moved all options into the `jslint` object

## 0.1.8

- Updating README.md to contain more verbose documentation
- Adding keywords to package.json

## 0.1.7

- Added an option to only report on errors

## 0.1.6

- Added an exclude option
- Added number of files in violation to standard output