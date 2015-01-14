var dashboard = angular.module('dashboard', []);

dashboard.config(function config( $stateProvider ) {
	$stateProvider.state('dashboard', {
		url: '/',			
		controller: 'DashboardCtrl',
		templateUrl: 'app/components/dashboard/index.tpl.html'	
	});
});

dashboard.controller('DashboardCtrl', function HomeController( $scope, titleService ) {
	titleService.setTitle('Dashboard');
});