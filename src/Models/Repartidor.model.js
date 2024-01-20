const {DataTypes} = require("sequelize")
const sequelize = require("../database.js")

const Repartidor= sequelize.define('Repartidor',{
    id_repartidor:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    nombre:{
        type:DataTypes.STRING(50),
        require:true
    }  
},{
    timestamps: false,
})

module.exports = Repartidor;