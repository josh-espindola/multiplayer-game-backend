import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = async(req,res,next)=>{
    try{
        /* Busco token, si no existe tiramos error 401. */
        const token = req.headers.authorization;
        if(!token) throw new AppError("Usuario no posee token",401);
        
        /* si el token existe, lo quitamos del formato de la cabecera y verificamos validez */
        const encoded = token.split(" ")[1];
        const isValidToken = verifyToken(encoded);
        /* Añadimos la informacion decodicada como una propiedad de la request */
        req.user = isValidToken
        next();
    }catch(err){
        next(new AppError("Token inválido",401))
    }

}

export {authMiddleware};
