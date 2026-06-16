import { z } from "zod";

export const registerSchema = z.object({
    lastName: z.string().min(2, 'Nom trop court'),
    firstName: z.string().min(2, 'Prénom trop court'),
    email: z.email('Email Invalide'),
    password: z.string().min(4, 'Mot de passe trop court'),
    age: z.number().min(15, 'Vous devez avoir plus de 15 ans').max(100, 'Vous devez avoir moins de 100 ans'),
})
