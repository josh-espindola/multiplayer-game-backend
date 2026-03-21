import { registerSchema } from './userSchema.js';
import AppError from '../utils/AppError.js';

const userValidator = (req,res,next)=>{
   const result = registerSchema.safeParse(req.body);
    if(!result.success){
        throw new AppError(result.error.issues[0].message,400);
    }

    next();
}

export { userValidator }