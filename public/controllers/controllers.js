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


app.controller('navbarCtrl', function($scope, SessionService){
    $scope.isUserLoggedIn = SessionService.isLoggedIn();
    console.log($scope.isUserLoggedIn);
});

app.controller('noteCtrl', function($scope, NotesService){
    $scope.notes = {};
    $scope.note = {
        id: null,
        title: '',
        text: ''
    };
    $scope.init = function(){
        $scope.notes={};
        NotesService.getAllNotes($scope);

        console.log($scope.notes);
    };
    $scope.refreshNotes = function(){
        NotesService.getAllNotes($scope);
    };

    $scope.showNote = function(note){
        $scope.note.id = note.id;
        $scope.note.text = note.note;
        $scope.note.title = note.name;
    };

    $scope.newNote = function(){
        NotesService.newNote($scope);
        NotesService.getAllNotes($scope);
    };

    $scope.saveNote = function(note){
        NotesService.updateNote(note, $scope);
    };


});