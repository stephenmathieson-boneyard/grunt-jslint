'use strict';

var red = require('./util').color.red,
  standard = require('./standard');

module.exports = function (report) {
  return standard(report, true);
};
