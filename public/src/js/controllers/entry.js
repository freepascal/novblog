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
        $scope.edit = function() {
            $state.go('entryEdit', { entry: $scope.entry });
        };
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

var EntryEdit = function($scope, $http, $controller, $warning, $state, $stateParams) {
    angular.extend(this, $controller('AuthController', {$scope: $scope}));
    angular.extend(this, $controller('TagCollection', {$scope: $scope}));

    // if users are not logged in, redirect them to login page
    if (!$scope.isAuthenticated()) {
        $state.go('login', {next: $state.current});
    }

    // we initialized $stateParams.entry = {}
    // user in edit mode if key title exists
    // else in create mode
    $scope.inEditMode = $stateParams.entry.title? true: false;
    console.log('inEditMode= ' + $scope.inEditMode);

    $scope.entry = $stateParams.entry || {};
    $scope.entry.tags = _.map($stateParams.entry.tags || [], function(item) {
        return item.tag;
    });

    $scope.addTag = function(tag) {
        // tag found not allowed to push
        if ($scope.entry.tags.indexOf(tag) == -1) {
            $scope.entry.tags.push(tag);
            // clear field for user to enter new tag
            $scope.tag = null;
        }
    };

    // when user clicks on icon [x] of each tag
    $scope.removeTag = function(tag) {
        $scope.entry.tags = _.reject($scope.entry.tags, function(el) {
            return el == tag;
        });
    };

    $scope.entry.store = function(entry) {
        // updating entry
        if ($scope.inEditMode) {
            console.log('updating entry...');
            $http({
                url: 'api/entry/' + $stateParams.entry.id,
                method: 'PUT',
                data: {
                    title: entry.title,
                    body: entry.body,
                    tags: entry.tags
                }
            }).then(function(res) {
                if (res.status == 200) {
                    $state.go('app');
                }
            }, function(res) {
                $warning(res);
            })
        } else {
            // store new entry
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
                    $state.go('app');
                }
            }, function(res) {
                $warning(res);
            });
        }
    }

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
    .controller('EntryEdit', EntryEdit);
