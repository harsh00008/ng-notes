app.service('SessionService', function($window,jwtHelper, $state){

    this.setLoggedIn = function(value){
        $window.localStorage.setItem('token',value);
    };

    this.isLoggedIn = function(){
        try{
            var token = $window.localStorage.getItem('token');
            if(token && !jwtHelper.isTokenExpired(token) && jwtHelper.decodeToken(token).id){
                return true;
            }
        }catch(err){
            return false;
        }

    };
    this.getUser = function(){
        try{
            var token = $window.localStorage.getItem('token');
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
    };
    this.logout = function(){
        $window.localStorage.clear();

    }
});