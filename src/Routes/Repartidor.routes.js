const {Router} = require('express')
const {crearRepartidor,conseguirRepartidor} = require('../Controller/Repartidor.controller.js')
const router = Router()

router.post('/crearRepartidor',crearRepartidor)
router.get('/conseguirRepartidor/:id',conseguirRepartidor)

module.exports = router