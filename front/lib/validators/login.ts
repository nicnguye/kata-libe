import { z } from "zod";

export const loginSchema = z.object({
    email: z.email('Email Invalide'),
    password: z.string().min(4, 'Mot de passe trop court'),
})
