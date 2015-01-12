module.exports = function (grunt) {
	grunt.registerTask('default', ['compileAssets', 'syncAssets', 'linkAssets','watch']);
};
