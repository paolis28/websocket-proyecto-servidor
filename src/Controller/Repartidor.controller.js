const Repartidor = require("../Models/Repartidor.model.js");

let responseClientes = [];
let repartidores = [];

const conseguirRepartidor = async (req, res) => {
  try {
    repartidores = await Repartidor.findAll();
    res.status(200).json({ repartidores });
  } catch (error) {
    res.status(500).json({ err: "Error al obtener repartidores", error });
  }
};

const obtenerReparNew = async (req, res) => {
  try {
    responseClientes.push(res);
    console.log(responseClientes.length);
  } catch (error) {
    console.error("Error al obtener nuevos repartidores", error);
    res.status(500).json({ err: "Error al obtener nuevos repartidores", error });
  }
};

const crearRepartidor = async (req, res) => {
  const { nombre, direccion } = req.body;

  try {
    const newRepartidor = await Repartidor.create({
      nombre: nombre,
      direccion: direccion,
    });

    if (newRepartidor) {
      const respuesta = newRepartidor.dataValues;
      repartidores.push(respuesta);
      responseClientes.forEach((cliente) => {
        cliente.status(200).json({ success: true, repartidores: repartidores });
      });
      responseClientes = []; 
      res.status(201).json({ success: true, msg: "Repartidor registrado" });
    }
  } catch (error) {
    console.error("Error al crear repartidor", error);
    res.status(500).json({ err: "Error al registrar repartidor", error });
  }
};

module.exports = {
  crearRepartidor,
  conseguirRepartidor,
  obtenerReparNew,
};