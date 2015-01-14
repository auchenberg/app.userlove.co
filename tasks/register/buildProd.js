module.exports = function (grunt) {
	grunt.registerTask('buildProd', [
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
