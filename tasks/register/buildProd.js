module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
		'bower',
		'compileAssets',
		'syncAssets',
		'concat',
		'uglify',
		'cssmin',
		'linkAssetsBuildProd',
		'clean:build',
		'copy:build'
	]);
};
