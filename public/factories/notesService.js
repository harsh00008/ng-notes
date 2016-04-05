app.factory('NotesService', function($http, $window, $state){

    var notes = {
        getAllNotes : function(scope){
            var token = $window.sessionStorage.getItem('token');
            return $http({
                method: 'GET',
                url: '/api/v1/notes',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            });
        },
        newNote: function(){
            var token = $window.sessionStorage.getItem('token');
            return $http({
                method: 'POST',
                url: '/api/v1/notes',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                }
            });;

        },
        updateNote: function(note){
            var token = $window.sessionStorage.getItem('token');
            return $http({
                method: 'PUT',
                url: '/api/v1/notes/' + note.id,
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json'
                },
                data: note
            });
        },
        deleteNote: function(noteId){
            if(noteId){
                var token = $window.sessionStorage.getItem('token');
                return $http({
                    method: 'DELETE',
                    url: '/api/v1/notes/'+noteId,
                    headers:{
                        'Authorization': token,
                        'Accept' : 'application/json'
                    }
                });
            }
        }


    };
    return notes;
});