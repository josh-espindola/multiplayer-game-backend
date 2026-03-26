import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './users/userRoutes.js'
import { authRouter } from './auth/authRouter.js';
import { dbConnection } from './config/db.js';
import { initSocket } from './socket/socket.js';
import { createServer } from 'http';


dotenv.config();

const app = express();
const httpServer = createServer(app) //

app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use("/api/",userRouter);
app.use("/api/auth",authRouter);


/* Error handler global */
app.use((err,req,res,next)=>{
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message })
})


/* Arranque del servidor  */

dbConnection().then(()=>{
    //Inicialiación del servidor sobre el server http
    initSocket(httpServer);
    
    httpServer.listen(process.env.PORT, ()=>{
        console.log("Servidor Corriendo");
    })
})


