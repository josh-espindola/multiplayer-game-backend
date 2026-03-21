import express from 'express';
import { deleteUserByIdController, editUserByIdController, getAllUsersController, getUserByIdController, registerController } from './userController.js';
import { userValidator } from './userValidation.js';
import { authMiddleware } from '../auth/authMiddleware.js';

const userRouter = express.Router();


userRouter.get("/users/",authMiddleware,getAllUsersController);
userRouter.get("/users/:id",getUserByIdController);
userRouter.post("/register",userValidator,registerController);
userRouter.patch("/users/:id",editUserByIdController);
userRouter.delete("/users/:id",deleteUserByIdController);


export { userRouter }