var app = angular.module('noteApp',['ui.router', 'ui.bootstrap']);

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
        });

});

app.controller('homeCtrl', function($scope){
    $scope.message = 'Hello world';
});

app.controller('loginCtrl', function($scope, $http){
    $scope.login = function(user){
        var json = JSON.stringify({
            email: user.email,
            password: user.password
        });
        $http.post('/login', json).then(function(data){
            console.log(data);
        }, function(err){
            console.log('Error: ' + err);
        });
    }
});

app.controller('registerCtrl', function($scope){

});