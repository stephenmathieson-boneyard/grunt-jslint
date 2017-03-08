
"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        jslint: {
            all: {
                src: ["*.js"],
                exclude: ["excludeme.js"],
                directives: {
                    node: true
                }
            }
        }
    });

    grunt.loadTasks("../../tasks");
};
