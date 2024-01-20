const express = require('express')
const cors = require('cors')
const app = express()

const Usuario = require('./Routes/Usuario.routes.js')
const Paquete = require('./Routes/Paquete.routes.js')
const Repartidor = require('./Routes/Repartidor.routes.js')

//Middlewares
app.use(express.json())
app.use(cors())

app.use('/apiWebsocket/Usuario',Usuario)
app.use('/apiWebsocket/Paquete',Paquete)
app.use('/apiWebsocket/Repartidor',Repartidor)

module.exports = app