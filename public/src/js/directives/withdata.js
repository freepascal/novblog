var withData = ['$rootScope', function($rootScope) {
    return {
        restrict: 'A',
        scope: {
            withData: '&'
        },
        link: function(scope, elem, attrs, ctrl) {
            var _vars = scope.withData();
            for(var key in _vars) {
                $rootScope[key] = _vars[key]
            }
        }
    };
}];

angular
    .module('novblog')
    .directive('withData', withData);
