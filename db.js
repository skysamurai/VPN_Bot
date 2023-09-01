const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegavpn',
    'aid',
    '1',
    {
        host: '185.140.209.72',
        port: '5432',
        dialect: 'postgres'
    }


)