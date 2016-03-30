var app = angular.module('noteApp',['ui.router', 'ui.bootstrap','angular-jwt']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home',{
            url: '/',
            templateUrl : 'partials/home/home.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/home/login.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'partials/home/register.html'
        })
        .state('dashboard',{
            url : '/dashboard',
            templateUrl: 'partials/dashboard/dashboard.html',
            authentication: true
        });

});

app.run(function($state, $rootScope,$http, $window, SessionService){
    $http.defaults.headers.common.Authorization = $window.localStorage.getItem('token');
    $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute){
        if(!SessionService.isLoggedIn() && currentRoute.authentication){
            event.preventDefault();
            $state.go('login');
        }
    });
});




