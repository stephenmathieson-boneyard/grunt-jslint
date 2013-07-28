
'use strict';

var spawn = require('child_process').spawn,
  path = require('path'),
  assert = require('better-assert');

var opts = {
  cwd: path.join(__dirname, '..', '..', 'examples', 'deprecation')
};

var out = '';

spawn('grunt', [ 'jslint' ], opts)
  .on('close', function (code) {
    // no errors
    assert(code !== 0);

    // contains
    assert(out.indexOf('grunt-jslint\'s interface has changed since 0.2.x') !== -1);
  })
  .stdout.on('data', function (data) {
    data = data.toString();
    out += data;
    if (process.argv.indexOf('--verbose') !== -1) {
      process.stdout.write(data);
    }
  });
