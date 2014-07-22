module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // JS Hint
    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'src/app/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true
        }
      }
    },

    // Compass w/ Sass
    compass: {
      dev: {
        options: {
          sassDir: 'src/sass/',
          cssDir: 'src/css/',
          importPath: 'src/sass/',
          imagesDir: 'src/img/img',
          javascriptsDir: 'src/app',
          environment: 'development'
        } 
      }
    },

    watch: {
      watch: {
        files: ['src/sass/*.scss', 'src/app/**/*.js'],
        tasks: ['jshint', 'compass:dev']
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['jshint', 'compass:dev']);

};
