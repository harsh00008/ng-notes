app.factory('NotesService', function($http){
    var notes = {
        getAllNotes : function(scope){

            $http.get('/api/v1/notes').then(function(data){
                scope.notes = data.data;
                console.log(data.data)
            }, function(err){
                console.log(err);
            });
        },
        newNote: function(){
            $http.post('/api/v1/notes', {}).then(function(data){
                console.log(data);
            }, function(err){
                console.log(err);
            });

        }
    };
    return notes;
});