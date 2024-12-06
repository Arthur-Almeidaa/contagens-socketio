const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

// Configura o servidor Socket.IO para permitir conexões de "localhost:3000" (onde o React está rodando)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// Evento de conexão do socket
io.on("connection", (socket) => {
    console.log('Novo cliente conectado');

    // Ouvindo o evento 'updateCounters' enviado pelo cliente
    socket.on('updateCounters', (data) => {
        console.log('Contagem Atualizada:', data);  // Aqui vamos exibir os dados que o cliente envia
    });

    // Evento de desconexão
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Inicia o servidor na porta especificada
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
