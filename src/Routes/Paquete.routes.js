const {Router} = require ('express')
const {crearPaquete,conseguirPaquete,eliminarPaquete} = require('../Controller/Paquete.controller.js')
const router2=Router()

router2.post('/crearPaquete',crearPaquete)
router2.get('/conseguirPaquete/:id',conseguirPaquete)
router2.delete('/eliminarPaquete/:id',eliminarPaquete)

module.exports = router2