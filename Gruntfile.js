'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jslint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'tasks/jslint.js',
        'test/*.js'
      ],
      directives: {
        unused: true,
        todo: true,
        indent: 2,
        nomen: true,
        node: true,
        stupid: true,
        ass: true
      },
      options: {
        junit: 'out/junit.xml',
        jslintXml: 'out/jslint_xml.xml',
        log: 'out/lint.log',
        errorsOnly: false,
        checkstyle: 'out/checkstyle.xml',
        failOnError: true // default
      }
    }
  });

  grunt.loadTasks('./tasks');

  grunt.registerTask('default', 'jslint');

};
