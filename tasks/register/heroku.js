module.exports = function (grunt) {
	grunt.registerTask('heroku:production', [
		'buildProd'
	]);
};