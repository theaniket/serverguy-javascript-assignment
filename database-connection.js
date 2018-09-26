const Sequelize = require('sequelize');

const sequelize = new Sequelize('sql12258593','sql12258593','JjLKItjvWk',{
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',
    port: 3306
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

module.exports = sequelize;