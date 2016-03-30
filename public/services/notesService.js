app.factory('NotesService', function($http){
    var notes = {
        getAllNotes : function(){

            $http.get('/api/v1/notes').then(function(data){
                console.log(data);
            }, function(err){
                console.log(err);
            });
        },
        createNode: function(note){
            var name = note.name;
            var description = note.description;
            var note = note.note;
            if(name){
                $http.post('/api/v1/notes', note).then(function(data){
                    console.log(data);
                }, function(err){
                    console.log(err);
                });
            }
        }

    };
    return notes;
});