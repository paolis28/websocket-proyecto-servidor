const {DataTypes} = require("sequelize")
const sequelize = require("../database.js")

const Repartidor= sequelize.define('Repartidor',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },nombre:{
        type:DataTypes.STRING(50)
    },
    direccion:{
        type:DataTypes.STRING(50),
        require:true
    }  
},{
    timestamps: false,
})

module.exports = Repartidor;