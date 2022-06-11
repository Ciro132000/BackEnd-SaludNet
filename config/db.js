const { Sequelize } = require('sequelize');
const config = require('./database')

const sequelize = new Sequelize(config.database,config.username,config.password,
    {
        host:config.host,
        port:config.port,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true,        
            }
        }
    }
)

const dbConnectMySql = async() => {
    try {
        await sequelize.authenticate();
        console.log('MYQSL Conexión correcta')
    } catch (e) {
        console.log('MYSQL Error de Conexión', e)
    }
}

module.exports = { sequelize, dbConnectMySql }