export const loginErrors: { [key: number]: string } = {
    401: "Mot de passe incorrect",
    404: "Utilisateur introuvable"
}

export const subscriptionErrors: { [key: number]: string } = {
    400: "Abonnement invalide",
    404: "Abonnement introuvable",
    409: "Vous avez déjà un abonnement!"
}

export const registerErrors: { [key: number]: string } = {
    409: "L'utilisateur existe déjà"
}