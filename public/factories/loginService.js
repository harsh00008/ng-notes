
app.factory('LoginService', function($http, $state, SessionService){
    var loginService = {
        login: function(user){
            return $http({
                method: 'POST',
                url: '/api/v1/login',
                data: user,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        register: function(user){
            return $http.post('/api/v1/register', user);
        }
    };

    return loginService;
});
