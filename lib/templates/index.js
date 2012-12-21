/*jslint node:true, stupid:true, nomen:true*/

var fs = require('fs');

var path = require('path');

var dirname = __dirname;

/**
 * Grab all the underscore templates in the directory
 *
 * @return {Object} The templates
 */
function templates() {
	'use strict';

	var result = {},
		files = fs.readdirSync(dirname);

	files = files.filter(function (file) {
		var ext = file.substring(file.length - 2);

		return ext === '._';
	});

	files.forEach(function (file) {

		file = path.join(dirname, file);

		// we only care about the file's name
		var templateName = path.basename(file);

		// remove `._`
		templateName = templateName.slice(0, templateName.length - 2);

		result[templateName] = fs.readFileSync(file, 'utf-8');

	});

	return result;
}

module.exports = templates();
