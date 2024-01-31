const Sequelize = require ('sequelize')
const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.HOST,
        dialect:"mysql"
    }
)

const conexion =async () => {
    try {
        await sequelize.authenticate();
        console.log('conexion exitosa');
      } catch (error) {
        console.error('error en la conexion', error);
      }
}
conexion()
module.exports = sequelize