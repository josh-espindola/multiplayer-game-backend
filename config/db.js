import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("================")
        console.log("Base de datos conectada");
        console.log("================")
    } catch (err) {
        console.log("No se ha podido conectar la base de datos", err.message);
        process.exit(1);
    }
}

export { dbConnection }