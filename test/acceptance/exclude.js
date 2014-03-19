
'use strict';

var spawn = require('child_process').spawn;
var path = require('path');
var assert = require('better-assert');

var out = '';

var opts = {
  cwd: path.join(__dirname, '..', '..', 'examples', 'exclude')
};

spawn('grunt', [ 'jslint' ], opts)
  .on('close', function (code) {
    // no errors
    assert(code === 0);
    // contains
    assert(out.indexOf('Done, without errors.') !== -1);
  })
  .stdout.on('data', function (data) {
    data = data.toString();
    out += data;
    if (process.argv.indexOf('--verbose') !== -1) {
      process.stdout.write(data);
    }
  });
