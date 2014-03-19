
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jslint: {
      all: {
        src: ['*.js'],
        exclude: ['excludeme.js'],
        directives: {
          node: true,
          indent: 2
        }
      }
    }
  });

  grunt.loadTasks('../../tasks');
};
