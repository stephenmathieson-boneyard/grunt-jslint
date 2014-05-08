
'use strict';

var spawn = require('child_process').spawn,
  path = require('path'),
  assert = require('better-assert');

var opts = {
  cwd: path.join(__dirname, '..', '..', 'examples', 'custom-edition')
};

var out = '';

spawn('grunt', [ 'jslint' ], opts)
  .on('close', function (code) {
    // has errors
    assert(code !== 0);

    // 2 violations
    assert(out.indexOf('# JSLint failed, 2 violations') !== -1);
  })
  .stdout.on('data', function (data) {
    data = data.toString();
    out += data;
    if (process.argv.indexOf('--verbose') !== -1) {
      process.stdout.write(data);
    }
  });
