const Repartidor = require('../Models/Repartidor.model.js')

const crearRepartidor = async (req,res) => {
    const {id_repartidor,nombre} = req.body

    if(!id_repartidor,!nombre){
        return res.status(400).json({error:"Todos los campos deben de llenarse"})
    }

    try{
        await Repartidor.sync()
        const newRepartidor = await Repartidor.create({
            id_repartidor:id_repartidor,
            nombre:nombre
        })
        res.json({newRepartidor})

    }catch(error){
        res.status(500).json({error:"Error al registrar repartidor", error})
        console.log(error)
    }
}

const conseguirRepartidor = async (req,res) =>{
    const id = req.params.id

    try{
        const repartidor = await Repartidor.findOne({
            where:{
                id_repartidor:id
            }
        })
        res.json(repartidor)
    }catch(error){
        res.status(500).json({error:"Error al buscar el repartidor"})
        console.log(error)
    }
}

module.exports = {
    crearRepartidor,
    conseguirRepartidor
}

