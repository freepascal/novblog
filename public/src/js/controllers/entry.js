var EntryCollection = function($scope, $http, $controller) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $http({
        url: 'api/entry',
        method: 'GET',
    }).then(function(res) {
        $scope.entries = res.data.entries;
    }, function(res) {

    });
};

var EntryShow = function($scope, $http, $controller, $stateParams) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $http({
        url: 'api/entry/' + $stateParams.slug,
        method: 'GET'
    }).then(function(res) {
        $scope.entry = res.data.entry;
    }, function(res) {

    });
};

angular
    .module('novblog')
    .controller('EntryCollection', EntryCollection)
    .controller('EntryShow', EntryShow);
