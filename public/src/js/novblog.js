var novblog = angular.module('novblog', [
    'ui.router',
    'satellizer',
    'ngSanitize',
    'ngMessages',
    'hljs'
]);

novblog.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    $urlRouterProvider.otherwise('app');
    $stateProvider
        .state('app', {
            url: '/',
            controller: 'EntryCollection',
            templateUrl: '/src/partials/app.html',
            data: {
                pageTitle: 'Novblog'
            }
        })
        .state('apptag', {
            url: '/tag/:slug',
            controller: 'TagShow',
            templateUrl: '/src/partials/apptag.html',
            data: {
                pageTitle: 'Novblog'
            }
        })
        .state('entryShow', {
            url: '/entry/:slug',
            controller: 'EntryShow',
            templateUrl: '/src/partials/entry/entry.show.html',
            data: {
                pageTitle: 'Novblog'
            }
        })
        .state('entryEdit', {
            url: '/newOrEdit',
            controller: 'EntryEdit',
            templateUrl: '/src/partials/entry/entry.edit.html',
            params: {
                entry: {}
            },
            // note that onEnter called before event $stateChangeSuccess triggered
            onEnter: function($rootScope, $stateParams) {
                if ($stateParams.entry.title) {
                    $rootScope.title = 'Update: ' + $stateParams.entry.title;
                } else {
                    $rootScope.title = 'Create new entry';
                }
            }
        })
        .state('login', {
            url: '/login',
            controller: 'AuthController',
            templateUrl: '/src/partials/auth/login.html',
            params: {
                next: 'app' // redirect to state app if logged in successful
            },
            data: {
                pageTitle: 'Login'
            }
        })
        .state('test', {
            url: '/wetest',
            controller: 'TestController',
            templateUrl: '/src/partials/test.html',
            data: {
                pageTitle: 'Test'
            }
        });

    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = 'api/auth/login';
    $authProvider.signupUrl = 'api/auth/register';
    $authProvider.tokenName = 'jwt';
    $authProvider.tokenPrefix = '';
});

toastr.options.closeButton = true;
