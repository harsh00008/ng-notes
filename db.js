var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('app_db','root','',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min : 0,
        idle: 1000
    }
});


var User = sequelize.define('user',{
    userid:{
        type: Sequelize.INTEGER,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

var Note = sequelize.define('note',{
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    note:{
        type: Sequelize.TEXT
    }
});

Note.belongsTo(User);

sequelize.sync().then(function(){
    return User.create({
        email: 'user@mail.com',
        password: 'password',
        name: 'Harsh Malewar'
    });
});

//export
module.exports = {
    getSequelize: function(){return Sequelize;},
    getUser : function(){ return User;},
    getNote: function(){ return Note;}
}
