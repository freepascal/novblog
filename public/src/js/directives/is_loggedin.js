var is_loggedin = ['$auth', '$rootScope', function($auth) {
    return {
        restrict: 'EA',
        link: function(scope, elem, attrs, ctrl) {
            
        }
    };
}];

angular
    .module('novblog')
    .directive('is_loggedin', is_loggedin);
