app.factory('NotesService', function($http, $window){

    var notes = {
        getAllNotes : function(scope){
            var token = $window.localStorage.getItem('token');
            console.log(token);
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
                console.log(err);
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
                console.log(err);
            });

        },
        updateNote: function(note, scope){
            var url = '/api/v1/notes/' + note.id;
            var token = $window.localStorage.getItem('token');
            $http({
                method: 'PUT',
                url: url,
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                },
                data: note}).then(function(data){
                scope.refreshNotes();
            },function(err){
                console.log(err);
            });
        }

    };
    return notes;
});