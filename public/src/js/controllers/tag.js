var TagCollection = function($scope, $http) {
    $http({
        url: 'api/tag',
        method: 'GET'
    }).then(function(res) {
        $scope.tags = res.data.tags;
    }, function(res) {

    });
};

var TagShow = function($scope, $http, $stateParams, $controller) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('EntryCollection', {$scope: $scope}));
    $http({
        url: 'api/tag/' + $stateParams.slug,
        method: 'GET'
    }).then(function(res) {
        $scope.entries = res.data.entries;
        alert(angular.toJson($scope.entries));
    }, function(res) {

    });
};

angular
    .module('novblog')
    .controller('TagCollection', TagCollection)
    .controller('TagShow', TagShow);
