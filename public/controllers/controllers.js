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

app.controller('loginCtrl', function($scope, $http, LoginService, SessionService, md5){
    $scope.error = null;
    SessionService.logout();
    $scope.login = function(user){
        user.password = md5.createHash(user.password);
        LoginService.login(user, $scope);
    };

});

app.controller('registerCtrl', function($scope, SessionService, LoginService, md5){
    $scope.error = null;
    $scope.register = function(user){
        user.password = md5.createHash(user.password);
        LoginService.register(user, $scope);
    };

});


app.controller('navbarCtrl', function($scope, SessionService){
    $scope.isUserLoggedIn = SessionService.isLoggedIn();
    $scope.name = SessionService.getUser().name;
});

app.controller('noteCtrl', function($scope, NotesService, SessionService){
    $scope.notes = {};
    $scope.note = {
        id: null,
        title: '',
        text: ''
    };
    $scope.name = {};
    $scope.activity = false;

    $scope.name = SessionService.getUser().name;

    $scope.deleteNote = function(noteId){
        NotesService.deleteNote(noteId);
        $scope.refreshNotes();
        $scope.activity = false;
    };

    $scope.init = function(){
        $scope.notes={};
        NotesService.getAllNotes($scope);
    };
    $scope.refreshNotes = function(){
        NotesService.getAllNotes($scope);
    };

    $scope.showNote = function(note){
        $scope.note.id = note.id;
        $scope.note.text = note.note;
        $scope.note.title = note.name;
        $scope.activity = true;
    };

    $scope.newNote = function(){
        NotesService.newNote($scope);
        NotesService.getAllNotes($scope);
    };

    $scope.saveNote = function(note){
        NotesService.updateNote(note, $scope);
    };


});