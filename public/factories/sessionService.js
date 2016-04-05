app.factory('SessionService', function($window,jwtHelper, $state){

    var session = {
        setLoggedIn: function(value){
            $window.sessionStorage.setItem('token',value);
        },
        isLoggedIn: function(){
            try{
                var token = $window.sessionStorage.getItem('token');
                if(token && !jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).id){
                    return true;
                }else{
                    return false;
                }
            }catch(err){
                return false;
            }

        },
        getUser: function(){
            try{
                var token = $window.sessionStorage.getItem('token');
                var decodedToken = jwtHelper.decodeToken(token);
                if(token && !jwtHelper.isTokenExpired(token) && decodedToken){
                    return {
                        name: decodedToken.name,
                        email: decodedToken.email
                    };
                }else{
                    $state.go('logout');
                }
            }catch(err){
                $state.go('logout');
            }
        },
        logout : function(){
            $window.sessionStorage.clear();
        }
    };
    return session;

});