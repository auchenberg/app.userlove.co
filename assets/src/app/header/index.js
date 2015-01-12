angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [
        {title: 'Campaigns', translationKey: 'navigation:campaigns', url: '/messages', iconClass: 'fa fa-comments'},
    ];

    var rightItems = [];

    if (!$scope.currentUser) {
        rightItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', iconClass: 'fa fa-comments', cssClass: 'navbar-right'});
        rightItems.push({title: 'Sign up', translationKey: 'navigation:register', url: '/register', iconClass: 'fa fa-briefcase',  cssClass: 'navbar-right'});
    }

    $scope.navItems = navItems;
    $scope.rightItems = rightItems;

});