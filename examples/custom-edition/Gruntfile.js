
module.exports = function (grunt) {
  grunt.loadTasks('../../tasks');

  grunt.initConfig({
    jslint: {
      all: {
        src: ['foo.js'],
        directives: {
          globals: ['foo'],
          // the following are not supported in 2010-12-16
          indent: 2,
          node: true
        },
        options: {
          edition: './jslint-2010-12-16.js'
        }
      }
    }
  });
};
