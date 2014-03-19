
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jslint: {
      all: {
        src: ['*.js'],
        exclude: ['excludeme.js']
      }
    }
  });

  grunt.loadTasks('../../tasks');
};
