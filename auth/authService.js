import { User } from "../users/userSchemaDB.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/hash.js";
import AppError from "../utils/AppError.js";

const authLoginService = async({username, password}) =>{
    /* Buscar usuario en la base de datos */
    const user = await User.findOne({username});
    if(!user) throw new AppError("Usuario no encontrado");
    /* Comparar la contraseña recibida, con la contraseña del usaurio */
    const isCorrectPassword = await comparePassword(password,user.password);
    
    if(!isCorrectPassword) throw new AppError("Credenciales invalidas");
    const payload = {
        id: user._id,
        username: user.username
    }
    return generateToken(payload);

}

export {authLoginService}