var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var api = require('./logic/api/routes');
var secret = require('./logic/jwt/secret').secret;


var app = express();
var port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());


//use this directory for angular
app.use(express.static(__dirname + '/public'));


app.use('/',api);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
