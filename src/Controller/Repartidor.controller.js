const Repartidor = require("../Models/Repartidor.model.js");

let responseCliente = [];
let repartidores = [];
const obtenerReparNew =  (req, res) => {
  
  responseCliente.push(res);
  console.log("ee");
};
function responseClient() {
  for (res of responseCliente) {
    res.status(201).json({
      success: true,
      repartidores: repartidores,
    });
  }
}

const crearRepartidor = async (req, res) => {
  const { nombre, direccion } = req.body;
  console.log(req.body);
  try {
    const newRepartidor = await Repartidor.create({
      nombre: nombre,
      direccion: direccion,
    });
    repartidores.push(newRepartidor);
    //responseClient();
    res.json({ success: true, msg: "Repartidor registrado" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar repartidor", error });
    console.log(error);
  }
};

const conseguirRepartidor = async (req, res) => {
  const repartidor = await Repartidor.findAll();
  if (repartidor) {
    repartidores.push(res);
    res.status(200).json({ repartidor });
  }
};



module.exports = {
  crearRepartidor,
  conseguirRepartidor,
  obtenerReparNew,
};
