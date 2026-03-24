import { Server } from 'socket.io';
import { connectionHandler } from './handlers/connectionHandler.js';
import { chatHandler } from './handlers/chatHandler.js';

const initSocket = (httpServer) => {
    /* Inicialización del servidor */
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL
        }
    })

    io.on("connection", (socket) => {
        connectionHandler(io, socket);
        chatHandler(io, socket);
    })

}

export { initSocket };