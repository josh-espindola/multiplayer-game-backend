import { asyncHandler } from "../utils/asyncHandler.js";
import { authLoginService } from "./authService.js";

const authLoginController = asyncHandler(async(req,res,next)=>{
    const { username, password } = req.body;
    const userLogged = await authLoginService({ username, password });
    res.status(200).json({ 
        message: "usuario registrado",
        token: userLogged
    })
})

export {authLoginController};