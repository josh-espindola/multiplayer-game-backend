import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { userRouter } from './users/userRoutes.js'
import { authRouter } from './auth/authRouter.js';
import { dbConnection } from './config/db.js';

dotenv.config();


const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/",userRouter);
app.use("/api/auth",authRouter);
/* Error handler global */
app.use((err,req,res,next)=>{
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message })
})


await dbConnection();
app.listen(process.env.PORT, ()=>{
    console.log("Servidor funcionando ")
})