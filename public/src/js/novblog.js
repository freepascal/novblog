var novblog = angular.module('novblog', [
    'ui.router',
    'satellizer'
]);

novblog.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider) {
    $urlRouterProvider.otherwise('app');
    $stateProvider
        .state('app', {
            url: '/',
            templateUrl: '/src/partials/app.html'
        });

    $locationProvider.html5Mode(true);

    $authProvider.loginUrl = 'api/auth/login';
    $authProvider.signupUrl = 'api/auth/register';
    $authProvider.tokenName = 'jwt';
    $authProvider.tokenPrefix = '';
    $authProvider.tokenHeader = '';
    $authProvider.tokenType = '';
});
