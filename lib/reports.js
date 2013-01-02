/*jslint node:true*/

require('./colors.js');

/**
 * Grab the `underscore/lodash` util from grunt.  The `util` namespace changed
 * form 0.3 to 0.4, so we're checking for both.
 */
var underscore = (function () {
	'use strict';
	/*jslint nomen:true*/

	var grunt = require('grunt');

	// grunt 0.4
	if (grunt.util && grunt.util._) {
		return grunt.util._;
	}

	// grunt 0.3
	return grunt.utils._;

}());

var templates = require('./templates/index.js');

/**
 * Escapes the given value so that it can be placed in an XML file.
 * @return the escaped value
 */
function escapeForXml(value) {
	'use strict';

	return value.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
}

/**
 * Produce the standard grunt-jslint report
 *
 * @param  {Object} report
 * @return {String}
 */
function standard(report) {
	'use strict';

	return underscore.template(templates.standard, {
		'report': report
	});

}

/**
 * Create a JUnit-style XML report
 *
 * @param  {Object} report
 * @return {String}
 */
function junitXml(report) {
	'use strict';

	var testCases = [],
		files = Object.keys(report.files);

	files.forEach(function (file) {

		var name = file,
			failures = [],
			filepathParts = underscore.compact(name.split(/[\\\/]/)),
			classname = filepathParts.join('.').replace(/\.js$/i, ''),
			filename = underscore.last(filepathParts);

		report.files[file].forEach(function (failure) {
			failures.push({
				id: filename + ':' + failure.line + ':' + (failure.character || ''),
				message: escapeForXml([
					failure.line + ':',
					failure.character ? failure.character + ':' : '',
					' ',
					failure.reason || 'Unused variable `' + failure.name + '`'
				].join(''))
			});
		});

		testCases.push({
			'name': file,
			'classname': classname,
			'filename': filename,
			'failures': failures
		});

	});

	return underscore.template(templates['junit-xml'], {
		'report': testCases
	});
}

/**
 * Create a JSLint-style XML report
 *
 * @param  {Object} report
 * @return {String}
 */
function jslintXml(report) {
	'use strict';

	var keys = Object.keys(report.files),
		files = [];

	keys.forEach(function (file) {
		var issues = report.files[file];
		underscore.each(issues, function (issue) {
			if (issue.reason) {
				issue.reason = escapeForXml(issue.reason);
			}
			if (issue.evidence) {
				issue.evidence = escapeForXml(issue.evidence);
			}
		});

		files.push({
			'name': file,
			'issues': issues
		});

	});

	return underscore.template(templates['jslint-xml'], {
		'report': files
	});
}

/**
 * Only report on errors
 *
 * @param  {Object} report [description]
 * @return {String}        [description]
 */
function errorsOnly(report) {
	'use strict';

	return underscore.template(templates['errors-only'], {
		'report': report
	});
}

module.exports = {
	'standard': standard,
	'junitXml': junitXml,
	'jslintXml': jslintXml,
	'errorsOnly': errorsOnly
};
