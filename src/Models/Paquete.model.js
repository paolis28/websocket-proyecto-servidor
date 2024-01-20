const {DataTypes} = require("sequelize")
const sequelize = require("../database.js")

const Paquete = sequelize.define("Paquete",{
    id_Paquete:{
        type: DataTypes.INTEGER,
        primaryKey:true
    }
},{
    timestamps: false,
})

module.exports = Paquete