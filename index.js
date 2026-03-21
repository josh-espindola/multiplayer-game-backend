import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './users/userRoutes.js'
import { dbConnection } from './config/db.js';

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.use("/api",userRouter)

/* Error handler global */
app.use((err,req,res,next)=>{
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message })
})


await dbConnection();
app.listen(process.env.PORT, ()=>{
    console.log("Servidor funcionando ")
})