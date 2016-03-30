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

app.controller('loginCtrl', function($scope, $http, LoginService){
    $scope.error = null;
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

app.controller('noteCtrl', function($scope, $uibModal, $log, NotesService){


    $scope.notes = NotesService.getAllNotes();

    $scope.newNote = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'newNoteModal',
            controller: function($scope, $uibModalInstance){
                $scope.createNote = function(note){
                    console.log(note);
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

    };



});