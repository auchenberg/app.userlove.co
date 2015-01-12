angular.module('userlove.dashboard', [
])
.config(function config( $stateProvider ) {
	$stateProvider.state('dashboard', {
		url: '/',			
		controller: 'DashboardCtrl',
		templateUrl: 'dashboard/index.tpl.html'	
	});
})

.controller( 'DashboardCtrl', function HomeController( $scope, titleService ) {
	titleService.setTitle('Dashboard');
});