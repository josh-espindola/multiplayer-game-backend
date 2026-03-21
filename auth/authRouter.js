import express from 'express';
import { authLoginController } from './authController.js';


const authRouter = express.Router();


authRouter.post("/login",authLoginController)


export { authRouter };