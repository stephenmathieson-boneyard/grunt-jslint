
'use strict';

var util = require('./util');

module.exports = function (report) {
  var xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<checkstyle>'
  ];

  Object.keys(report.files).forEach(function (file) {
    var issues = report.files[file];

    xml.push('<file name="' + file + '">');

    issues.forEach(function (issue) {
      var msg = issue.message || issue.reason || 'Unused variable "' + issue.name + '"';
      var column = typeof issue.column === "number"
        ? issue.column
        : issue.character;

      xml.push([
        '<error',
        ' line="' + issue.line + '"',
        ' column="' + column + '"',
        ' severity="warning"',
        ' message="' + util.escapeForXml(msg) + '"',
        ' source="com.jslint"',
        '/>'
      ].join(''));
    });

    xml.push('</file>');
  });

  xml.push('</checkstyle>');

  return xml.join('\n');
};
