
app.factory('loginService', function($http, $state, sessionService){
    var user = {
        login: function(user, scope){
            var email = user.email;
            var password = user.password;
            if(email && password){
                var json = JSON.stringify({
                    email: user.email,
                    password: user.password
                });
                $http.post('/api/v1/login', json).then(function(data){
                    sessionService.setLoggedIn(true);
                    var token = JSON.parse(data.data).token;
                    sessionService.setLoggedIn(token);
                    $state.go('dashboard');
                }, function(err){
                    sessionService.setLoggedIn('');
                    scope.error = true;
                });
            }else{
                sessionService.setLoggedIn('');
                scope.error = false;
            }
        }
    };

    return user;
});