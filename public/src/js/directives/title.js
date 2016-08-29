var title = ['$rootScope', '$timeout', '$auth', function($rootScope, $timeout, $auth) {
    return {
        restrict: 'E',
        link: function(scope, elem) {
            var listener = function(event, state) {
                $timeout(function() {
                    $rootScope.title = state.data.pageTitle? state.data.pageTitle: 'Novblog';
                });
            };
            $rootScope.$on('$stateChangeSuccess', listener);
        }
    };
}];

angular
    .module('novblog')
    .directive('title', title);
