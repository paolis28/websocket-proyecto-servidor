const {DataTypes} = require("sequelize");
const sequelize = require("../database.js");

const Usuario = sequelize.define('Usuario',{
    id_usuario:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type: DataTypes.STRING(50),
        required: true
    },
    contrasena:{
        type:DataTypes.INTEGER,
        require:true
    },
},{
    timestamps: false,
});

module.exports = Usuario;