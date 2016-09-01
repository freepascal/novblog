var novblog = angular.module('novblog', [
    'ui.router',
    'satellizer',
    'ngSanitize'
]);

novblog.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    /* helper auth functions */
    var requireLoggedIn = function($q, $auth, $path) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          deferred.resolve();
        } else {
            console.log('redirect to /login');
          $location.path('/login');
        }
        return deferred.promise;
    };

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
            url: '/t/:slug',
            controller: 'TagShow',
            templateUrl: '/src/partials/apptag.html',
            data: {
                pageTitle: 'Novblog'
            }
        })
        .state('appentry', {
            url: '/e/:slug',
            controller: 'EntryShow',
            templateUrl: '/src/partials/appentry.html',
            data: {
                pageTitle: 'Novblog'
            }
        })
        .state('newentry', {
            url: '/new',
            controller: 'EntryStore',
            templateUrl: '/src/partials/newentry.html',
            data: {
                pageTitle: 'Create a new entry'
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
        });

    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = 'api/auth/login';
    $authProvider.signupUrl = 'api/auth/register';
    $authProvider.tokenName = 'jwt';
    $authProvider.tokenPrefix = '';
});
