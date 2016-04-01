var app = angular.module('noteApp',['ui.router', 'ui.bootstrap','angular-jwt','angular-meditor','mp.deepBlur','angular-md5']);

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
            templateUrl: 'partials/home/register.html',
            controller: 'registerCtrl'
        })
        .state('dashboard',{
            url : '/dashboard',
            templateUrl: 'partials/dashboard/dashboard.html',
            authentication: true
        })
        .state('logout',{
            url: '/login'
        })
        .state('about',{
            url:'/about',
            templateUrl: 'partials/home/about.html'
        });


});

app.run(function($state, $rootScope,$http, $window, SessionService){
    $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute){
        if(!SessionService.isLoggedIn() && currentRoute.authentication){
            event.preventDefault();
            $state.go('login');
        }
    });
});




