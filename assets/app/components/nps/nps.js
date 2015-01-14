var nps = angular.module('nps', ['angular-steps']);

nps.directive('nps',function ($timeout, $parse, $window, StepsService, $http) {
    
    var link = function ($scope, element, attrs) {

        $scope.campaign = window.campaign;

        $scope.cancel = function () {
            if (attrs.cancel) {
                $parse(attrs.cancel)(scope);
            } else {
                $timeout(function() {
                    window.location.href = '/';
                }, 0);
            }
        };

        $scope.submit = function (message, score) {

            var req = $http.post('/campaign/embed/' + $scope.campaign.embed_token, {
                score: score,
                comment: message
            });
            
            StepsService.steps().goTo('thankyou');
        };

        $scope.home = function () {
            if (attrs.home) {
                $parse(attrs.home)($scope);
            } else {
                $timeout(function() {
                    window.location.href = '/';
                }, 0);
            }
        };

    };

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/components/nps/nps.tpl.html',
        link: link,
        scope: {
            session: '='
        }
    };

});