angular.module('userlove', [
	'ui.router',
	'ngSails',
	'lodash',
	'angularMoment',
	'ui.bootstrap',
	'templates-app',
	'services',
	'models',
	'userlove.header',
	'userlove.about',
	'userlove.dashboard',
	'userlove.campaigns',
])

.config(function($stateProvider, $urlRouterProvider, $locationProvider ) {
	$locationProvider.html5Mode(true);
})

.run(function() {
	moment.lang('en');
})

.controller('AppCtrl', function($scope, config ) {
	config.currentUser = window.currentUser;
});