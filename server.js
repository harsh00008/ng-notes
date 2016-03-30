var express = require('express');
var fs = require('fs');
var app = express();
var port = 8888;

app.listen(port);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.send('hello world!');
});

console.log('Server started on port ' + port);