/*jslint node:true*/

require('colors');

var underscore = require('underscore');

var templates = require('./templates/index.js');


/**
 * [standard description]
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
 * [junitXml description]
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
			failures = [];

		report.files[file].forEach(function (failure) {
			failures.push([
				failure.line + ':',
				failure.character ? failure.character + ':' : '',
				' ',
				failure.reason || 'Unused variable `' + failure.name + '`'
			].join(''));
		});

		testCases.push({
			'name': file,
			'failures': failures
		});

	});

	return underscore.template(templates['junit-xml'], {
		'report': testCases
	});
}

/**
 * [jslintXml description]
 *
 * @param  {Object} report
 * @return {String}
 */
function jslintXml(report) {
	'use strict';

	var keys = Object.keys(report.files),
		files = [];

	keys.forEach(function (file) {

		files.push({
			'name': file,
			'issues': report.files[file]
		});

	});

	return underscore.template(templates['jslint-xml'], {
		'report': files
	});
}

/**
 * [errorsOnly description]
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
