var AuthController = function($auth, $scope, $http) {
    $scope.is_loggedin = function() {
        return $auth.isAuthenticated();
    }

    $scope.$watch(function() {
        return $auth.isAuthenticated();
    }, function(val) {
        if (val == true) {
            $http({
                url: BACKEND_API + 'auth/user'
            }).then(function(data) {
                $scope.user = data.user;
            }, function(data) {
                alert(data.error);
            });
        }
    });
};

angular
    .module('novblog')
    .controller('AuthController', AuthController);
