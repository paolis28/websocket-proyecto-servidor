const {Router} = require ('express')
const {crearUsuario,conseguirUsuarios,conseguirUsuario,modificarUsuario,eliminarUsuario} = require ('../Controller/Usuario.controller.js')
const router3=Router()


router3.get('/conseguirUsuarios',conseguirUsuarios)
router3.get('/conseguirUsuario',conseguirUsuario)    //Id con parametros
router3.post('/crearUsuario',crearUsuario)
router3.put('/modificarUsuario',modificarUsuario)        //ID con cuerpo
router3.delete('/eliminarUsuario/:id',eliminarUsuario)   //Id con parametros

module.exports = router3