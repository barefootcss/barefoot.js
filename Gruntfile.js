module.exports = function(grunt) {

	grunt.initConfig({
   		concat: {
			js: {
				src: [
					'src/intro.js',
					'src/core/*.js',	
				   	'src/outro.js',
					'src/com/*.js'				   	
				],
				dest: 'builds/barefoot-js.full.js'
			}
   		},
   		uglify: {
   			js: {
   				src: 'builds/barefoot-js.full.js',
   				dest: 'builds/barefoot-js.min.js'
   			},
   		},
   		cssmin: {
   			minify: {
   				src: 'css/barefoot-js.css',
   				dest: 'builds/barefoot-js.min.css'
   			}
   		}
	});

 	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-aetheon-cssmin');

 	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

}
