app.factory('NotesService', function($http, $window, $state){

    var notes = {
        getAllNotes : function(scope){
            var token = $window.localStorage.getItem('token');
            $http({
                method: 'GET',
                url: '/api/v1/notes',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
                }).then(function(data){
                scope.notes = data.data;
            }, function(err){
                if(err.status == 401){
                    $state.go('logout');
                }
            });
        },
        newNote: function(scope){
            var token = $window.localStorage.getItem('token');
            $http({
                method: 'POST',
                url: '/api/v1/notes',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            }).then(function(data){
                scope.refreshNotes();
            }, function(err){
                if(err.status == 401){
                    $state.go('logout');
                }
            });

        },
        updateNote: function(note, scope){
            if(note.id){
                var url = '/api/v1/notes/' + note.id;
                var token = $window.localStorage.getItem('token');
                $http({
                    method: 'PUT',
                    url: url,
                    headers: {
                        'Authorization': token,
                        'Accept': 'application/json'
                    },
                    data: note
                }).then(function(data){
                    scope.refreshNotes();
                },function(err){
                    if(err.status == 401){
                        $state.go('logout');
                    }
                });
            }

        },
        deleteNote: function(noteId){
            if(noteId){
                var token = $window.localStorage.getItem('token');
                $http({
                    method: 'DELETE',
                    url: '/api/v1/notes/'+noteId,
                    headers:{
                        'Authorization': token,
                        'Accept' : 'application/json'
                    }
                }).then(function(data){

                }, function(err){
                    if(err.status == 401){
                        $state.go('logout');
                    }
                });
            }
        }


    };
    return notes;
});