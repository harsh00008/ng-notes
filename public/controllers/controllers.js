/**
 * Created by harshmalewar on 3/30/16.
 */
app.controller('globalCtrl', function($scope, SessionService){
    $scope.loggedIn = SessionService.isLoggedIn();
    if(SessionService.isLoggedIn){
        $scope.loggedIn = true;
        $scope.navUrl = './partials/common/header-logged.html';
    }else{
        $scope.loggedIn = false;
        $scope.navUrl = './partials/common/header.html';
    }
});

app.controller('homeCtrl', function($scope, SessionService){
    SessionService.logout();
});

app.controller('loginCtrl', function($scope, $http, LoginService, SessionService){
    $scope.error = null;
    SessionService.logout();
    $scope.login = function(user){
        LoginService.login(user, $scope);
    };

});

app.controller('registerCtrl', function($scope, SessionService, LoginService){
    $scope.error = null;
    $scope.register = function(user){
        LoginService.register(user, $scope);
    };
});


app.controller('dashboardCtrl', function($scope, $state, SessionService){

});

app.controller('navbarCtrl', function($scope, SessionService){
    $scope.isUserLoggedIn = SessionService.isLoggedIn();
    console.log($scope.isUserLoggedIn);
});

app.controller('noteCtrl', function($scope, NotesService){
    $scope.note = {
        id: 0,
        title: '',
        text: ''
    };

    $scope.notes= [];
    NotesService.getAllNotes($scope);

    $scope.showNote = function(note){
        $scope.note.id = note.id;
        $scope.note.text = note.note;
        $scope.note.title = note.name;
    };

    $scope.newNote = function(){
        NotesService.newNote();
        NotesService.getAllNotes($scope);
    };

    $scope.saveNote = function(note){
        console.log(note);
    }



});