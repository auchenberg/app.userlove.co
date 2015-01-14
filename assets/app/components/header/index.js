
var header = angular.module('header', []);
    
header.controller('HeaderCtrl', function( $state, $scope, config) {
    $scope.currentUser = config.currentUser;
})

header.directive('navHeader', [function() {
    
    var link = function ($scope, element, attrs) {

        var navItems = [
            {title: 'Campaigns', translationKey: 'navigation:campaigns', url: '/campaigns', iconClass: 'fa fa-comments'},
        ];

        var rightItems = [];

        if (!$scope.currentUser) {
            rightItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', iconClass: 'fa fa-comments', cssClass: 'navbar-right'});
            rightItems.push({title: 'Sign up', translationKey: 'navigation:register', url: '/register', iconClass: 'fa fa-briefcase',  cssClass: 'navbar-right'});
        }

        $scope.navItems = navItems;
        $scope.rightItems = rightItems;
    };

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/header/index.tpl.html',
        link: link
    };
    
}]);