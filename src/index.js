const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const appExpress = express();
const server = http.createServer(appExpress);
const io = socketIo(server);
const cors = require('cors');

// Habilita CORS
appExpress.use(cors());

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chat message', (message) => {
        console.log('Mensaje recibido:', message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
