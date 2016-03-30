var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db');
var jwt = require('jsonwebtoken');
var api = require('./routes/routes');
var secret = 'mysecret';

//initialize database stuff
var Sequelize = db.getSequelize();
var User = db.getUser();
var Note = db.getNote();

var app = express();
var port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());

//use this directory for angular
app.use(express.static(__dirname + '/public'));




app.post('/api/v1/login', function(req, res){
    var sess = req.session;
    var email = req.body.email;
    var pass = req.body.password;
    var User = db.getUser();
    User.findOne({
        where: {
            email: email,
            password: pass
        }
    }).then(function(user){
        if(user){
            var token = '';
            if(!user.token){
                token = jwt.sign({ id: user.userid, name: user.name, email: user.email },secret,{expiresIn: '2 days'});
            }else{
                token = user.token;
            }
            res.setHeader('Content-Type','application/json');
            res.json(JSON.stringify({token: token}));
        }else{
            sess.user = null;
            res.sendStatus(400);
        }
        res.end();
    });
});

app.post('/api/v1/register', function(req,res){

    var email = req.body.email;
    var pass = req.body.password;
    var name = req.body.name;
    var Note = db.getNote();
    if(email && pass && name){
        User.create({
            email : email,
            password: pass,
            name: name
        }).then(function(user){
            if(user){
                res.sendStatus(200);
            }else{
                sess.user = null;
                res.sendStatus(400);
            }
            res.end();
        });
    }else{
        res.sendStatus(400);
        res.end();
    }
});


app.listen(port, function(){
    console.log('Server started on port ' + port);
});
