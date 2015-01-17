module.exports = function(grunt) {

    grunt.config.set('bower', {
        install: {
            options: {
                install: true,
                verbose: false,
                copy: false
            }
        }
    });

	grunt.loadNpmTasks('grunt-bower-task');
    
}