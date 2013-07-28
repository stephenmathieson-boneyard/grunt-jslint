
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jslint: {
      all: {
        src: [
          'hello.js'
        ],
        directives: {
          node: true
        }
      }
    }
  });

  grunt.loadTasks('../../tasks');
};
