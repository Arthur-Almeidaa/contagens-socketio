const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const path = require('path');
const { get } = require('https');

const port = process.env.PORT || 5000;
const staticPath = path.resolve(__dirname, 'dist')

app.use(express.static(staticPath))

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://contagens-socketio.onrender.com/",
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

if(process.env.NODE_ENV === "production"){
    app.get("*", (req, res) => {
        const indexFile = path.join(__dirname, "dist", "index.html")
        return res.sendFile(indexFile)
    })
}

// Inicia o servidor na porta especificada
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
