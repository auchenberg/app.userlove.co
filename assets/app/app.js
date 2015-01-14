var app = angular.module('userlove', [
	'ui.router',
	'ngSails',
	'lodash',
	'angularMoment',
	'ui.bootstrap',
	'templates-app',
	'services',
	'models',
	
	'header',
	'dashboard',
	'campaigns',
	'nps'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider ) {
	$locationProvider.html5Mode(true);
})

app.run(function(amMoment) {
	amMoment.changeLanguage('en');
})

app.controller('AppCtrl', function($scope, config ) {
	config.currentUser = window.currentUser;
})