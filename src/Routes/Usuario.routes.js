const {Router} = require ('express')
const {crearUsuario,conseguirUsuarios,conseguirUsuario,modificarUsuario,eliminarUsuario} = require ('../Controller/Usuario.controller.js')
const router=Router()


router.get('/conseguirUsuarios',conseguirUsuarios)
router.get('/conseguirUsuario',conseguirUsuario)    //Id con parametros
router.post('/crearUsuario',crearUsuario)
router.put('/modificarUsuario',modificarUsuario)        //ID con cuerpo
router.delete('/eliminarUsuario/:id',eliminarUsuario)   //Id con parametros

module.exports = router