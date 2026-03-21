import bcrypt from 'bcrypt';

const hashPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
}


const comparePassword = async (password, hash) =>{
    const compare = await bcrypt.compare(password,hash)
    return compare;
}


export {hashPassword, comparePassword};