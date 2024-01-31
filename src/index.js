const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Habilita CORS
const app = express();
app.use(cors());
const Usuario = require('./Routes/Usuario.routes.js');
const Paquete = require('./Routes/Paquete.routes.js');
const Repartidor = require('./Routes/Repartidor.routes.js');
const res = require('express/lib/response.js');

//Middlewares
app.use(express.json());

app.use('/Usuario',Usuario);
app.use('/Paquete',Paquete);
app.use('/Repartidor',Repartidor);
// const io = require('socket.io')(http);
const server = http.createServer(app);

/******** - SOCKET.IO IMPLEMENTACINO DE ROOMS -**********/
const io = require('socket.io')(server,{
    cors:{
        origin:"*"
    }
})

const NEW_CHAT_MESSAGE_EVENT="newChatMessage"

io.on('connection',(socket)=>{
    console.log("socket id is "+socket.id+ "connected")

    const {roomId} = socket.handshake.query
    socket.join(roomId)

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data)=>{
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT,data)
    })

    socket.on('disconnect', ()=>{
        socket.leave(roomId)
    })
})
/**************************************************/

/************** - SHORT POLLING -**************/
let estadoPaquete = 'En preparación';

function cambiarEstadoPaquete(nuevoEstado) {
    estadoPaquete = nuevoEstado;
    io.emit('estado_paquete', estadoPaquete);
}

// Ruta para obtener el estado del paquete
app.get('/estado-paquete', (req, res) => {
    res.json({ estado: estadoPaquete });
});

// Ruta para cambiar el estado del paquete
app.post('/cambiar-estado-paquete/:nuevoEstado', (req, res) => {
    const nuevoEstado = req.params.nuevoEstado;
    cambiarEstadoPaquete(nuevoEstado);
    res.send(`Estado del paquete cambiado a: ${nuevoEstado}`);
});

/**************************************************/

/************** - LONG POLLING no es -**************/
let repartidoresDisponibles = [];
let clientesEsperando = [];

function actualizarRepartidoresDisponibles(nuevosRepartidores) {
    repartidoresDisponibles = nuevosRepartidores;
    while (clientesEsperando.length > 0) {
        const cliente = clientesEsperando.shift();
        cliente.res.json(repartidoresDisponibles);
        console.log(clientesEsperando);
    }
}

app.get('/repartidores-disponibles', (req, res) => {
    if (repartidoresDisponibles.length > 0) {
        res.json(repartidoresDisponibles);
        console.log(repartidoresDisponibles);
    } else {
        clientesEsperando.push({ res });
    }
});

app.post('/actualizar-repartidores-disponibles', (req, res) => {
    const nuevosRepartidores = req.body.repartidores;
    actualizarRepartidoresDisponibles(nuevosRepartidores);
    res.send('Repartidores disponibles actualizados correctamente');
    console.log(nuevosRepartidores);
});

/**************************************************/

const PORT = process.env.PORT || 3000;
server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

/*codigo del short polling*/
setInterval(() => {
    console.log('Estado actual del paquete:', estadoPaquete);
}, 6000);