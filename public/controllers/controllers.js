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

app.controller('loginCtrl', function($scope, $http, LoginService, SessionService, md5, $state){
    $scope.error = null;
    SessionService.logout();

    $scope.login = function (user){
        if(user.email && user.password){
            user.password = md5.createHash(user.password);
            LoginService.login(user).then(function(data){
                SessionService.setLoggedIn(data.data.token);
                $state.go('dashboard');
            },function(error){
                $scope.error = error.data.error;
            });
        }else{
            $scope.error="Please fill in the form completely";
        }
    };
});

app.controller('registerCtrl', function($scope, SessionService, LoginService, md5){
    $scope.error = null;
    $scope.register = function(user){
        if(user.password!=user.repassword){
            $scope.error = 'Passwords do not match';
        }else{
            user.password = md5.createHash(user.password);
            LoginService.register(user).then(function(data){
                $scope.message = 'Successfully registered!';
            }, function(error){
                $scope.error = error;
            });
        }

    };
});

app.controller('navbarCtrl', function($scope, SessionService){
    $scope.isUserLoggedIn = SessionService.isLoggedIn();
    $scope.name = SessionService.getUser().name;
});

app.controller('noteCtrl', function($scope, NotesService, SessionService, $state){
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
        NotesService.deleteNote(noteId).then(function(data){
            $scope.refreshNotes();
        },function(error){
            if(error.status == 401){
                $state.go('logout');
            }
        });
        $scope.activity = false;
    };

    $scope.init = function(){
        $scope.notes={};
        NotesService.getAllNotes().then(function(data){
            $scope.notes = data.data;
        },function(error){
            if(error.status == 401){
                $state.go('logout');
            }
        });
    };
    $scope.refreshNotes = function(){
        NotesService.getAllNotes().then(function(data){
            $scope.notes = data.data;
        },function(error){
            if(error.status == 401){
                $state.go('logout');
            }
        });
    };

    $scope.showNote = function(note){
        $scope.note.id = note.id;
        $scope.note.text = note.note;
        $scope.note.title = note.name;
        $scope.activity = true;
    };

    $scope.newNote = function(){
        NotesService.newNote().then(function(data){
            $scope.refreshNotes();
        },function(error){
            if(error.status == 401){
                $state.go('logout');
            }
        });
    };

    $scope.saveNote = function(note){
        NotesService.updateNote(note).then(function(data){
            $scope.refreshNotes();
        },function(error){
            if(error.status == 401){
                $state.go('logout');
            };
        });
    };

});