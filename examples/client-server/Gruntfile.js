
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jslint: {
      client: {
        src: [ 'client.js' ],
        directives: {
          browser: true,
          globals: [
            'jQuery'
          ]
        }
      },
      server: {
        src: [
          'server.js'
        ],
        directives: {
          node: true
        }
      }
    }
  });

  grunt.loadTasks('../../tasks');
};
