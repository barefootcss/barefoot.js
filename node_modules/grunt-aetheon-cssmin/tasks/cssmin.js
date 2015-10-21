/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.

 * example:

 cssmin: {
  
  files: {},
  options: {
    relativeTo: vars.LIB_FOLDER,
    keepSpecialComments: true,
    report: false
  }

 }


 */

'use strict';

module.exports = function(grunt) {
  
  var helper = require('grunt-lib-contrib').init(grunt),
      path = require('path'),
      cleanCSS = require('clean-css');

  grunt.registerMultiTask('cssmin', 'Minify CSS files', function() {
    
    var options = this.options({
      minimize: true,
      report: false,
      relativeTo: null
    });

    this.files
      .forEach(function(f) {
      
          var valid = f.src.filter(function(filepath) {
            // Warn on and remove invalid source files (if nonull was set).
            if (!grunt.file.exists(filepath)) {
              grunt.log.warn('Source file "' + filepath + '" not found.');
              return false;
            } else {
              return true;
            }
          });

          var max = valid
                      .map(grunt.file.read)
                      .join(grunt.util.normalizelf(grunt.util.linefeed));

          var min = valid.map(function(f) {
            
            var cssOptions = {
              relativeTo: options.relativeTo || path.dirname(f),
              keepSpecialComments: 0
            };

            var cssContent = grunt.file.read(f);
            cssContent = minifyCSS(cssContent, cssOptions);

            return cssContent;

          }).join('');

          if (min.length < 1) {
            grunt.log.warn('Destination not written because minified CSS was empty.');
          } else {
            if ( options.banner ) {
              min = options.banner + grunt.util.linefeed + min;
            }
            grunt.file.write(f.dest, min);
            grunt.log.writeln('File ' + f.dest + ' created.');
            if(options.report) {
              helper.minMaxInfo(min, max, options.report);
            }
          }

      });



  });

  var minifyCSS = function(source, options) {
    try {
      return cleanCSS.process(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('css minification failed.');
    }
  };
};
