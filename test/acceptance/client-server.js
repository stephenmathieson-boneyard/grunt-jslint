
'use strict';

var spawn = require('child_process').spawn,
  path = require('path'),
  assert = require('better-assert');

var opts = {
  cwd: path.join(__dirname, '..', '..', 'examples', 'client-server')
};

function log(data) {
  if (process.argv.indexOf('--verbose') !== -1) {
    process.stdout.write(data);
  }
}

var out = '';

// run client
spawn('grunt', [ 'jslint:client' ], opts)
  .on('close', function (code) {
    // has errors
    // grunt seems to fail with random and
    // arbitrary exit codes.  `$ grunt jslint:client`
    // fails with 3, but i have no idea why.
    assert(code !== 0);

    assert(out.indexOf('Missing \'use strict\' statement.') !== -1);

    // contains
    assert(out.indexOf('# JSLint failed, 1 violations in 1.  1 files scanned.') !== -1);

    // run server
    out = '';

    spawn('grunt', [ 'jslint:server' ], opts)
      .on('close', function (code) {
        // has errors
        // grunt seems to fail with random and
        // arbitrary exit codes.  `$ grunt jslint:client`
        // fails with 3, but i have no idea why.
        assert(code !== 0);

        assert(out.indexOf('Unexpected sync method: \'readFileSync\'.') !== -1);
        assert(out.indexOf('Unexpected dangling \'_\' in \'__dirname\'.') !== -1);
        assert(out.indexOf('Missing \'use strict\' statement.') !== -1);
        assert(out.indexOf('Unused \'req\'.') !== -1);

        // contains
        assert(out.indexOf('# JSLint failed, 4 violations in 1.  1 files scanned.') !== -1);
      })
      .stdout.on('data', function (data) {
        data = data.toString();
        out += data;
        log(data);
      });
  })
  .stdout.on('data', function (data) {
    data = data.toString();
    out += data;
    log(data);
  });
