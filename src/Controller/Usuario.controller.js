const Usuario = require('../Models/Usuario.model.js')

const crearUsuario = async (req,res) =>{
    const {nombre,contrasena,apellidoPaterno,apellidoMaterno} = req.body

    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

    try{
        if(!nombre || !contrasena){
            return res.status(400).json({error:"Todos los campos son obligatorios"})
        }

        if(!permitido.test(nombre)){
            return res.status(400).json({error:"Nombre inválido, solo se aceptan acentos como caracteres especiales"})
        }

        await Usuario.sync();
        const newUsuario = await Usuario.create({
            nombre:nombre,
            contrasena:contrasena,
        })

        await newUsuario.validate()
        await newUsuario.save()

        res.json({
            newUsuario
        })

    }catch(error){
        res.status(500).json({error:"Error al crear al usuario",error})
        console.log(error)
    }
}

const conseguirUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(); 
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar los usuarios", error });
        console.log(error);
    }
};


const conseguirUsuario = async(req,res)=>{
    const id = req.params.id

    try{
        const usuario = await Usuario.findOne({
            where:{
                id_usuario:id
            }
        })
        res.json(usuario)
    }catch(error){
        res.status(500).json({error:"Error al buscar el usuario"})
        console.log(error)
    }
}

const modificarUsuario = async (req, res)=>{
    const {id_usuario,nombre,contrasena,apellidoPaterno,apellidoMaterno} = req.body
    const id=parseInt(id_usuario)
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

    try{
        if(!id || !nombre || !apellidoPaterno || !apellidoMaterno){
            return res.status(400).json({error:'Todos los campos son obligatorios'})
        }
        if (isNaN(id)) {
            return res.status(400).json({error:"id inválido, el id debe ser un número"})
        }
        if(!permitido.test(nombre)){
            return res.status(400).json({error:"Nombre inválido, solo se aceptan acentos como caracteres especiales"})
        }
    
        if(!permitido.test(apellidoPaterno)){
            return res.status(400).json({error:"Apellido Paterno inválido, solo se aceptan acentos como caracteres especiales"})
        }
    
        if(!permitido.test(apellidoMaterno)){
            return res.status(400).json({error:"Apellido Materno inválido, solo se aceptan acentos como caracteres especiales"})
        }
    
        const updateUsuario = await Usuario.update({
            nombre:nombre,
            contrasena:contrasena,
        },{
            where:{
                id_usuario:id
            }
        })
    
        res.json({updateUsuario})

    }catch(error){
        res.status(500).json({error: "Error al modificar cliente"});
        console.log(error);
    }
}

const eliminarUsuario = async (req, res) => {
    const id = req.params.id

    try {
        await Usuario.destroy({
            where:{
                id_usuario:id
            }
        });
        res.send("Usuario eliminado");
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar al cliente", error });
        console.log(error);
    }
};


module.exports = {
    crearUsuario,
    conseguirUsuarios,
    conseguirUsuario,
    modificarUsuario,
    eliminarUsuario
}