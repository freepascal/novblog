var EntryCollection = function($scope, $http, $controller, $rootScope, $warning) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $http({
        url: 'api/entry',
        method: 'GET',
    }).then(function(res) {
        $scope.entries = res.data.entries;
    }, function(res) {
        $warning(res);
    });
};

var EntryShow = function($scope, $http, $controller, $warning, $stateParams, $state) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    $http({
        url: 'api/entry/' + $stateParams.slug,
        method: 'GET'
    }).then(function(res) {
        $scope.entry = res.data.entry;
    }, function(res) {
        $warning(res);
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
            $warning(res);
        });
    };
};

var EntryStore = function($scope, $http, $controller, $warning, $state, $timeout) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));
    if (!$scope.isAuthenticated()) {
        $state.go('login', {next: $state.current});
    }
    $scope.entry = {};
    $scope.entry.tags = [];
    $scope.addTag = function(tag) {
        if ($scope.entry.tags.indexOf(tag) == -1) {
            $scope.entry.tags.push(tag);
            $scope.tag = null;
        }
    };
    $scope.removeTag = function(tag) {
        $scope.entry.tags = _.reject($scope.entry.tags, function(el) {
            return el == tag;
        });
    };
    $scope.entry.store = function(entry) {
        $http({
            url: 'api/entry',
            method: 'POST',
            data: {
                title: entry.title,
                body: entry.body,
                tags: entry.tags
            }
        }).then(function(res) {
            if (res.status == 200) {
                alert('success');
            }
        }, function(res) {
            $warning(res);
        });
    };

    angular.element('#tag').on('input', function() {
        var val = this.value;
        if ($('datalist option').filter(function() {
            return this.value == val;
        }).length) {
            $timeout(function() {
                $scope.addTag(val);
                $scope.tag = null;
            }, 1);
        }
    });
};

angular
    .module('novblog')
    .controller('EntryCollection', EntryCollection)
    .controller('EntryShow', EntryShow)
    .controller('EntryStore', EntryStore);
