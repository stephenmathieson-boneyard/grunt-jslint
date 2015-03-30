'use strict';

var vows = require('vows'),
  suite = vows.describe('exclude'),
  jslint = require('../tasks/jslint.js'),
  assert = require('assert');

function makeMockGrunt() {
  var mockGrunt = {
    file: {
    },
    overrides: {
    }
  };

  mockGrunt.file.expand = function (a) {

    if (mockGrunt.overrides[a]) {
      return mockGrunt.overrides[a];
    }

    return a;
  };

  return mockGrunt;
}

suite.addBatch({
  'exclude works with literal paths': {
    topic: function () {
      var files = ['a', 'b', 'c'],
        excludedFiles = ['b'],
        mockGrunt = makeMockGrunt();

      files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
      this.callback(null, files);
    },
    'should remove excluded file': function (err, files) {
      assert.deepEqual(['a', 'c'], files);
    }
  },

  'exclude works with globbed paths': {
    topic: function () {
      var files = ['./js/**/*.js'],
        excludedFiles = ['./js/bundle*.js'],
        mockGrunt = makeMockGrunt();

      mockGrunt.overrides = {
        './js/**/*.js': [
          './js/foo.js'
        ]
      };

      files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
      this.callback(null, files);
    },
    'should succeed even if excluded files is empty array': function (err, files) {
      assert.deepEqual(['./js/foo.js'], files);
    }
  },

  'exclude works with globbed paths (2)': {
    topic: function () {
      var files = ['./js/**/*.js'],
        excludedFiles = [],
        mockGrunt = makeMockGrunt();

      mockGrunt.overrides = {
        './js/**/*.js': [
          './js/foo.js',
          './js/bundle.min.js'
        ]
      };

      files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
      this.callback(null, files);
    },
    'should match all expanded files when excluded files is empty array': function (err, files) {
      assert.deepEqual(['./js/foo.js', './js/bundle.min.js'], files);
    }
  },

  'exclude works with globbed paths (3)': {
    topic: function () {
      var files = ['./js/**/*.js'],
        excludedFiles = ['./js/bundle*.js'],
        mockGrunt = makeMockGrunt();

      mockGrunt.overrides = {
        './js/**/*.js': [
          './js/foo.js',
          './js/bundle.min.js'
        ],
        './js/bundle*.js': [
          './js/bundle.min.js'
        ]
      };

      files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
      this.callback(null, files);
    },
    'should exclude files after expansion': function (err, files) {
      assert.deepEqual(['./js/foo.js'], files);
    }
  },

  'exclude works with globs and subdirs (4)': {
    topic: function () {
        var files = ['js/**/*.js'],
            excludedFiles = [
                    'js/jsDocs/**/*.js',
                    'js/lib/**/*.js',
                    'js/scripts.min.js'
            ],
            mockGrunt = makeMockGrunt();

        mockGrunt.overrides = {
            'js/**/*.js': [
                'js/0.js',
                'js/1/2.js',
                'js/jsDocs/3.js',
                'js/jsDocs/4/5.js',
                'js/lib/6.js',
                'js/lib/7/8.js'
            ],
            'js/jsDocs/**/*.js': [
                'js/jsDocs/3.js',
                'js/jsDocs/4/5.js'
            ],
            'js/lib/**/*.js': [
                'js/lib/6.js',
                'js/lib/7/8.js'
            ]
        };

        files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
        this.callback(null, files);
    },
    'should exclude files after expansion': function (err, files) {
        assert.deepEqual(files, ['js/0.js', 'js/1/2.js']);
    }
  },

  'exclude works with globs and subdirs (5)': {
    topic: function () {
        var files = ['js/**/*.js'],
            excludedFiles = [
                    'js/jsDocs/**/*.js',
                    'js/lib/**/*.js',
                    'js/scripts.min.js'
            ],
            mockGrunt = makeMockGrunt();

        mockGrunt.overrides = {
            'js/**/*.js': [
                'js/scripts.js',
                'js/scripts.min.js',
                'js/jsDocs/scripts/URI.js',
                'js/jsDocs/scripts/bootstrap-dropdown.js',
                'js/jsDocs/scripts/bootstrap-tab.js',
                'js/jsDocs/scripts/docstrap.lib.js',
                'js/jsDocs/scripts/sunlight.js',
                'js/jsDocs/scripts/toc.js',
                'js/lib/jquery.min.js'
            ],
            'js/jsDocs/**/*.js': [
                'js/jsDocs/scripts/URI.js',
                'js/jsDocs/scripts/bootstrap-dropdown.js',
                'js/jsDocs/scripts/bootstrap-tab.js',
                'js/jsDocs/scripts/docstrap.lib.js',
                'js/jsDocs/scripts/sunlight.js',
                'js/jsDocs/scripts/toc.js',
            ],
            'js/lib/**/*.js': [
                'js/lib/jquery.min.js'
            ]
        };

        files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
        this.callback(null, files);
    },
    'should exclude files after expansion': function (err, files) {
        assert.deepEqual(files, ['js/scripts.js']);
    }
  },


  'exclude is not dog slow': {
    topic: function () {
      var files = [],
        excludedFiles = [],
        includedFiles = [],
        i,
        s,
        t,
        mockGrunt = makeMockGrunt();

      for (i = 0; i < 1000; i += 1) {
        s = String(i);
        if (i % 2) {
          excludedFiles.push(s);
        } else {
          includedFiles.push(s);
        }
        files.push(s);
      }

      t = process.hrtime();
      files = jslint.expandAndExclude(mockGrunt, files, excludedFiles);
      t = process.hrtime(t);

      this.callback(null, files, includedFiles, t);
    },

    'should exclude files without taking forever': function (err, files, includedFiles) {
      assert.deepEqual(includedFiles, files);
    },
    'should have short duration': function (err, files, includedFiles, t) {
      var microseconds = 1.0e6 * t[0] + t[1] / 1000;
      assert.ok(microseconds < 20000);
    }
  }
});

suite.export(module);
