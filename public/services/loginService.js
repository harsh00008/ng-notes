
app.factory('LoginService', function($http, $state, SessionService){
    var user = {
        login: function(user, scope){
            SessionService.logout();
            var email = user.email;
            var password = user.password;
            if(email && password){
                var json = JSON.stringify({
                    email: user.email,
                    password: user.password
                });
                $http.post('/api/v1/login', json).then(function(data){
                    SessionService.setLoggedIn(true);
                    var token = data.data.token;
                    SessionService.setLoggedIn(token);
                    $state.go('dashboard');
                }, function(err){
                    SessionService.logout();
                    scope.error = err.data.error;
                });
            }else{
                SessionService.logout();
                scope.error = false;
            }
        },
        register: function(user,scope){
            var email = user.email;
            var password = user.password;
            var name = user.name;
            if(email && password && email && user){
                $http.post('/api/v1/register', user).then(function(data){
                    scope.message = data.data.message;
                    scope.error=null;
                }, function(err){
                    scope.error = err.data.error;
                });
            }else{
                scope.error = "Please complete all the fields";
            }
        }
    };

    return user;
});
