var EntryCollection = function($scope, $http, $controller) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $scope.entries = [];
    $http({
        url: 'api/entry',
        method: 'GET',
    }).then(function(res) {
        $scope.entries = res.data.entries;
    }, function(res) {

    });
};

var EntryShow = function($scope, $http, $controller, $stateParams, $state) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $http({
        url: 'api/entry/' + $stateParams.slug,
        method: 'GET'
    }).then(function(res) {
        $scope.entry = res.data.entry;
    }, function(res) {

    });
    $scope.delete = function(id) {
        var sure = confirm('Are your sure to delete this entry?');
        if (!sure) {
            return;
        }
        $http({
            url: 'api/entry/' + id,
            method: 'DELETE'
        }).then(function(res) {
            $state.go('app');
        }, function(res) {

        });
    };
};

var EntryStore = function($scope, $http, $controller, $state) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    if (!$scope.isAuthenticated()) {
        $state.go('login', {next: $state.current});
    }
};

angular
    .module('novblog')
    .controller('EntryCollection', EntryCollection)
    .controller('EntryShow', EntryShow)
    .controller('EntryStore', EntryStore);
