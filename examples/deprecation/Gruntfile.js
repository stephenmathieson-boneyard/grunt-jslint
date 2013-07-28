
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jslint: {
      files: [ 'foo.js' ]
    }
  });

  grunt.loadTasks('../../tasks');
};
