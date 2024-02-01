const {Router} = require('express')
const {crearRepartidor,conseguirRepartidor,obtenerReparNew} = require('../Controller/Repartidor.controller.js')
const router = Router()

router.post('/crearRepartidor',crearRepartidor)
router.get('/conseguirRepartidor',conseguirRepartidor)
router.get('/ObtenerRapartidorNuevo',obtenerReparNew)

module.exports = router