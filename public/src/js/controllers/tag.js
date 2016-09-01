var TagCollection = function($scope, $http) {
    $scope.tags = [];
    $http({
        url: 'api/tag',
        method: 'GET'
    }).then(function(res) {
        $scope.tags = res.data.tags;
        console.log(angular.toJson($scope.tags));
    }, function(res) {

    });
};

var TagShow = function($scope, $http, $stateParams, $controller) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $scope.entries = [];
    $http({
        url: 'api/tag/' + $stateParams.slug,
        method: 'GET'
    }).then(function(res) {
        $scope.entries = res.data.entries;
    }, function(res) {

    });
};

angular
    .module('novblog')
    .controller('TagCollection', TagCollection)
    .controller('TagShow', TagShow);
