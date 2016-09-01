var AuthController = function($auth, $scope, $http, $state, $stateParams) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.$watch(function($scope) {
        return $auth.isAuthenticated();
    }, function(val) {
        if (true == val) {
            $scope.user = {
                name: 'Khang',
                email: 'magicalmoon17@gmail.com'
            };
            $http({
                url: 'api/auth/user',
                method: 'POST'
            }).then(function(res) {
                $scope.user = res.data.user;
            }, function(res) {
                alert(angular.toJson(res.data));
            });
        }
    });

    $scope.login = function() {
        var credentials = {
            email: $scope.email,
            password: $scope.password
        };

        $auth
            .login(credentials)
            .then(function(res) {
                $auth.setToken(res);
                console.log(angular.toJson(res.data));
                if ($stateParams.next) {
                    // logged in, redirect to next state
                    $state.go($stateParams.next.name);
                }
            })
            .catch(function(res) {
                console.log(angular.toJson(res.data));
            });
    };

    $scope.logout = function() {
        if (!$auth.isAuthenticated());
        $auth.logout();
    };
};

angular
    .module('novblog')
    .controller('AuthController', AuthController);
