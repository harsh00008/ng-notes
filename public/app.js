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

app.run(function($state, $rootScope, sessionService){
    $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute){
        if(!sessionService.isLoggedIn() && currentRoute.authentication){
            event.preventDefault();
            $state.go('login');
        }
    });
});


app.controller('homeCtrl', function($scope, sessionService){
    sessionService.logout();
});

app.controller('loginCtrl', function($scope, $http, loginService){
    $scope.error = false;
    $scope.login = function(user){
        loginService.login(user, $scope);
    };
});

app.controller('registerCtrl', function($scope){
    sessionService.logout();
});


app.controller('dashboardCtrl', function($scope, $state, sessionService){
    console.log('sessionsService '+sessionService.isLoggedIn());
});

app.controller('navbarCtrl', function($scope, sessionService){
    $scope.isUserLoggedIn = sessionService.isLoggedIn();
    console.log($scope.isUserLoggedIn);


});