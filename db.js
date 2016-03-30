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
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    token:{
        type: Sequelize.STRING
    },
    issuedAt:{
        type: Sequelize.INTEGER
    },
    expiryAt:{
        type: Sequelize.INTEGER
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

sequelize.sync();


//export
module.exports = {
    getSequelize: function(){return Sequelize;},
    getUser : function(){ return User;},
    getNote: function(){ return Note;}
}
