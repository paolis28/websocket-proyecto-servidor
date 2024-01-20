const app = require('./app.js');
const sequelize = require('sequelize');

async function main(){
    try{
        // await sequelize.sync()
        app.listen(3000)
        console.log("Server is listen on port", 3000)
    }catch(error){
        console.log("Fallo la conexion a la base de datos", error)
    }
}

main();