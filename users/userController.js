import { asyncHandler } from '../utils/asyncHandler.js'
import { deleteUserByIdService, getAllUsersServices, editUserByIdService, getUserByIdService, userRegisterService } from "./userServices.js";


const registerController = asyncHandler(async (req, res, next) => {
    const { username, password, email } = req.body;
    const user = await userRegisterService({ username, password, email });
    res.status(201).json({ message: "usuario creado", user });

})

const getAllUsersController = asyncHandler(async (req, res, next) => {
    const user = await getAllUsersServices();
    res.status(200).json({ message: "lista de usuarios", user })
})

const getUserByIdController = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await getUserByIdService({ id });
    res.status(200).json({ message: "usuario encontrado", user });
})

const editUserByIdController = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await editUserByIdService({ id, email, password });
    res.status(200).json({ message: "usuario editado con exito", user })

})

const deleteUserByIdController = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    await deleteUserByIdService({ id });
    res.status(200).json({ message: "usuario eliminado correctamente" })
})



/* 
const loginController = asyncHandler( async (req,res,next)=>{
    const {username , password } = req.body;
    res.status(200).json({ message: "usuario Logeado", username})
})
 */
export {
    registerController,
    getAllUsersController,
    getUserByIdController,
    editUserByIdController,
    deleteUserByIdController
};