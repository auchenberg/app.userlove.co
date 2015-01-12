angular.module( 'sailng', [
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'angularMoment',
	'ui.bootstrap',
	'templates-app',
	'services',
	'models',

	'sailng.header',
	'userlove.dashboard',
	'sailng.about',
	'sailng.messages'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {


	$locationProvider.html5Mode(true);
})

.run( function run () {
	moment.lang('en');
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
	config.currentUser = window.currentUser;
});