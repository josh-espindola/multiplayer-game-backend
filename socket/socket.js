import { Server } from 'socket.io';
import { connectionHandler } from './handlers/connectionHandler.js';
import { chatHandler } from './handlers/chatHandler.js';
import { verifyToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js'

const initSocket = (httpServer) => {
    /* Inicialización del servidor */
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL
        },
    })
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) throw new AppError("Token required", 401);

            const payload = verifyToken(token); // devuelve id, username, etc.
            socket.user = payload; // 🔹 guardamos info del usuario en el socket
            next();
        } catch (err) {
            next(err);
        }
    })


    io.on("connection", (socket) => {
        connectionHandler(io, socket);
        chatHandler(io, socket);
    })


}

export { initSocket };