app.service('sessionService', function($window,jwtHelper){

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

    this.logout = function(){
        $window.localStorage.clear();
    }
});