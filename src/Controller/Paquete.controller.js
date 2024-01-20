const Paquete = require('../Models/Paquete.model.js')

const crearPaquete = async (req,res)=>{
    const {id_Paquete} = req.body;
    console.log(id_Paquete);

    try{
        if(!id_Paquete){
            return res.status(400).json({error:"Campo id no pude estar vacío"})
        } 
        
        await Paquete.sync();
        const newPaquete= await Paquete.create({
            id_Paquete:id_Paquete
        })

        res.json({
            newPaquete
        })

    }catch(error){
        res.status(500).json({error:"Error al registrar paquete", error})
        console.log(error)
    }
}

const conseguirPaquete = async(req,res)=>{
    const id=req.params.id

    try{
        const paquete = await Paquete.findOne({
            where:{
                id_Paquete:id
            }
        })
        res.json(paquete)
    }catch(error){
        res.status(500).json({error:"Error al buscar el paquete"})
        console.log(error)
    }
}

const eliminarPaquete = async (req,res) =>{
    const id = req.params.id

    try{
        await Paquete.destroy({
            where:{
                id_Paquete:id
            }
        })
    }catch(error){
        res.status(500).json({ error: "Error al eliminar paquete", error });
        console.log(error);
    }
}

module.exports={
    crearPaquete,
    conseguirPaquete,
    eliminarPaquete
}