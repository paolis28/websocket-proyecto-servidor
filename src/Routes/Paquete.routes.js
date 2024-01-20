const {Router} = require ('express')
const {crearPaquete,conseguirPaquete,eliminarPaquete} = require('../Controller/Paquete.controller.js')
const router=Router()

router.post('/crearPaquete',crearPaquete)
router.get('/conseguirPaquete/:id',conseguirPaquete)
router.delete('/eliminarPaquete/:id',eliminarPaquete)

module.exports = router