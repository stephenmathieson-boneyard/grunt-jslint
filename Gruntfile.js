'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    jslint: {
      source: {
        src: [
          'index.js',
          'Gruntfile.js',
          'lib/**/*.js',
          'tasks/jslint.js'
        ],
        directives: {
          unused: true,
          todo: true,
          indent: 2,
          vars: true,
          node: true,
          stupid: true,
          ass: true,
          plusplus: true,
          regexp: true
        },
        options: {
          junit: 'out/junit.xml',
          jslintXml: 'out/jslint_xml.xml',
          log: 'out/lint.log',
          errorsOnly: false,
          checkstyle: 'out/checkstyle.xml',
          edition: 'latest',
          failOnError: true // default
        }
      },

      // tests differ slightly, as vows is stupid
      tests: {
        src: [
          'test/*.js',
          'test/acceptance/*.js'
        ],
        directives: {
          unparam: true,
          indent: 2,
          node: true,
          nomen: true,
          todo: true
        }
      }
    }

  });

  grunt.loadTasks('./tasks');

  grunt.registerTask('default', 'jslint');

};
