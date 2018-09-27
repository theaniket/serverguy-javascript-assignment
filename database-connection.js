const Sequelize = require('sequelize');

const sequelize = new Sequelize('serverguy-assignment',null,null,{
    host: 'db4free.net',
    dialect: 'sqlite',
    port: 3306,
    storage: 'data.db'
});

const user = sequelize.define('User',{
    username: Sequelize.STRING,
    emailId: Sequelize.STRING,
    password: Sequelize.STRING
});

const search = sequelize.define('Search',{
    text: Sequelize.STRING,
    createdOn: Sequelize.DATE,
    userId: Sequelize.INTEGER
})

module.exports = {sequelize, user, search};