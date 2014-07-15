module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['compass:dev']);

};
