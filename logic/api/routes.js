var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = require('../jwt/secret').secret;
var db = require('../db/db');
var Sequelize = db.getSequelize();
var User = db.getUser();
var Note = db.getNote();



router.get('/api/test', function(req, res){
    res.status(200);
    res.write('Api works!');
    res.end();
});


router.post('/api/v1/login', function(req, res){

    var email = req.body.email;
    var pass = req.body.password;
    User.findOne({
        where: {
            email: email,
            password: pass
        }
    }).then(function(user){
        if(user){

            if(!user.token){
                token = jwt.sign({ id: user.userid, name: user.name, email: user.email },secret,{expiresIn: '2 days'});
                user.updateAttributes({
                    token: token
                });
            }else{
                token = user.token;
            }
            res.setHeader('Content-Type','application/json');
            res.status(200).send({token: token});
        }else{
            res.status(400).send({error: 'Invalid login. Email or password do not match.'});
        }
    });
});

router.post('/api/v1/register', function(req,res){
    var email = req.body.email;
    var pass = req.body.password;
    var name = req.body.name;
    if(email && pass && name){

        User.create({
            email : email,
            password: pass,
            name: name
        }).then(function(user){
            if(user){
                res.status(200).send({message: 'User successfully registered!'});
            }else{
                res.status(400).send({error: 'Could not register the user'});
            }
        }).catch(function(err){
            res.status(400).send({error: 'Could not register the user. Already exists. Try some other email'});
        });

    }else{
        res.send(400).send({error: 'please complete the registration form'});
    }
});

router.get('/api/v1/notes', function(req,res){
    var token = req.headers.authorization;
    try {
        var decoded = jwt.verify(token, secret);
        var userId = decoded.id;
        var email = decoded.email;
        User.findOne({
            where: {
                email: email,
                userid: userId
            }
        }).then(function(user){
            if(user){
                Note.findAll({
                    where: {
                        userId: user.userid
                    },
                    attribute:['id','name']
                }).then(function(notes){
                    if(notes){
                        res.json(notes);
                    }else{
                        res.status(204).send();
                    }
                });
            }else{
                res.status(401).send("Invalid request");
            }
        });
    } catch(err) {
        res.status(401).send("Invalid token");
    }
});

router.put('/api/v1/notes/:id', function(req, res){
    var noteId = req.params.id;
    var token = req.headers.authorization;
    try {
        var decoded = jwt.verify(token, secret);
        var userId = decoded.id;
        var email = decoded.email;
        User.findOne({
            where: {
                email: email,
                userid: userId
            }
        }).then(function(user){
            if(user){
                return user;
            }else{
                res.status(401).send("Invalid request");
            }
        }).then(function(user){
            Note.find({
                where:{
                    id: noteId,
                    userId: user.userid
                }
            }).then(function(note){
                if(note){
                    var name = req.body.title;
                    name = name?  name: 'Untitled';
                    var noteText = req.body.text;
                    noteText = noteText? noteText: 'Click to edit me'
                    note.updateAttributes({
                        name: name,
                        note: noteText,
                        userId: user.userid

                    }).then(function(note){
                        if(note){
                            res.status(200).send(note);
                        }else{
                            res.status(400).send();
                        }
                    });
                }else{
                    res.status(400).send('Could not create note. Try again!');
                }
            });
        });
    } catch(err) {
        res.status(400).send("Invalid token");
    }
});

router.post('/api/v1/notes', function(req, res){
    var token = req.headers.authorization;
    if(token){
        try {
            var decoded = jwt.verify(token, secret);
            var userId = decoded.id;
            var email = decoded.email;
            User.findOne({
                where: {
                    email: email,
                    userid: userId
                }
            }).then(function(user){
                if(user){
                    return user;
                }else{
                    res.status(401).send("Invalid request");
                }
            }).then(function(user){
                Note.create({
                    name: 'Untitled',
                    description: 'No description',
                    note: 'Click to edit me',
                    userId: user.userid
                }).then(function(note){
                    if(note){
                        res.json(note);
                    }else{
                        res.status(400).send('Could not create note. Try again!');
                    }
                });
            });
        } catch(err) {
            res.status(401).send("Invalid token");
        }
    }else{
        res.status(401).send("Invalid token");
    }

});

router.delete('/api/v1/notes/:id', function(req, res){
    var token = req.headers.authorization;
    var noteId = req.params.id;
    if(token){
        try {
            var decoded = jwt.verify(token, secret);
            var userId = decoded.id;
            var email = decoded.email;
            User.findOne({
                where: {
                    email: email,
                    userid: userId
                }
            }).then(function(user){
                if(user){
                    return user;
                }else{
                    res.status(401).send("Invalid request");
                }
            }).then(function(user){
                Note.destroy({
                    where:{
                        userId: userId,
                        id: noteId
                    }
                }).then(function(note){
                    res.status(200).send();
                });
            });
        } catch(err) {
            res.status(401).send("Invalid token");
        }
    }else{
        res.status(401).send("Invalid token");
    }
});

module.exports = router;
