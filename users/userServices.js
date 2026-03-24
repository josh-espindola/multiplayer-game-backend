import { User } from "./userSchemaDB.js";
import AppError from "../utils/AppError.js";
import { hashPassword, comparePassword } from "../utils/hash.js";


const userRegisterService = async ({username, password, email}) => {
    /* Buscar si el usuario ya existe */
    const userAlreadyExists = await User.findOne({ $or :[{ username }, { email }]});
    if(userAlreadyExists) throw new AppError("Este usuario ya ha sido registrado",400);
    /* Hashing password */
    const hashedPassword = await hashPassword(password);
    const data = { username, password: hashedPassword, email}
    /* Creo al usuario */
    const user = await User.create(data);
    return user;

}

const getAllUsersServices = async() => {
   
    const allUsers = await User.find();
    return allUsers;

}

const getUserByIdService = async ({id})=>{

    const userById = await User.findById(id);
    if(!userById) throw new AppError("Usuario no encontrado",404);
    return userById;

}

const editUserByIdService = async ({ id,password,email}) =>{
    
    if(password){
        const hashedPassw = await hashPassword(password);
    }
    const userUpdated = await User.findByIdAndUpdate(
        id,
        { password : hashedPassw, email },
        { returnDocument: 'after' }
    )

    if(!userUpdated) throw new AppError("No se puede encontrar usuario");
    
    console.log("Informacion actualizada del usuario",userUpdated.id,userUpdated.username);
    return userUpdated;
}

const deleteUserByIdService = async({id})=>{

    const userDeleted = await User.findByIdAndDelete(id);
    if(!userDeleted) throw new AppError("No se puede eliminar al usuario",404);
    console.log("Se ha eliminado al usuario", userDeleted.id, userDeleted.username);
    return userDeleted;

}

export { 
    userRegisterService, 
    getAllUsersServices, 
    getUserByIdService,
    editUserByIdService,
    deleteUserByIdService,
}