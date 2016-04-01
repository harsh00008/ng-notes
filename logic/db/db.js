var mysql = require('mysql');
var Sequelize = require('sequelize');
var database = require('./connection').database;
var db = new Sequelize(database.name, database.username,database.password, database.connection);

var User = db.define('user',{
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

var Note = db.define('note',{
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

Note.belongsTo(User,{foreignKey: 'userId'});

db.sync();


module.exports = {
    getSequelize: function(){return Sequelize;},
    getUser : function(){ return User;},
    getNote: function(){ return Note;}
}
