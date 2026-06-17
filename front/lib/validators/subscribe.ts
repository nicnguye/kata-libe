import { z } from "zod";

const creditCardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;

export const subscribeSchema = z.object({
    email: z.email('Email Invalide'),
    address: z.string().min(2, 'Adresse trop courte'),
    phone: z.string().min(10, 'Numéro de téléphone invalide'),
    creditCard: z.string().regex(creditCardRegex, 'Carte de crédit invalide'),
})
