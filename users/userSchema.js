import { z } from 'zod';

const registerSchema = z.object({
    username: z.string().min(3,"El nombre de usuario debe tener más de 3 carácteres"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 carácteres"),
    email: z.email("Email invalido.")
})

export { registerSchema }