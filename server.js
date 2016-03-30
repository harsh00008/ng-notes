var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('./db');

//initialize database stuff
var Sequelize = db.getSequelize();
var User = db.getUser();
var Note = db.getNote();

var app = express();
var port = process.env.PORT || 8888;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret :'abcjsofekfps',
    saveUninitialized: true,
    resave: true
}));

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
    res.end();
});

app.post('/login', function(req, res){
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
            sess.user = {
                name: user.name,
                email: user.email,
                id: user.userid
            };
            res.sendStatus(200);
        }else{
            sess.user = null;
            res.sendStatus(400);
        }
        res.end();
    });
});

app.get('/tp',function(req, res){
    res.json(req.session.user);
});

app.post('/register', function(req,res){

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
