import axios from 'axios';

// TODO :  Remove and add to .env
const baseURL = 'https://fa50-83-118-208-130.ngrok-free.app';

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Si la réponse est reçue avec un code d'erreur
            throw new Error(error.response.data.message || 'Something went wrong');
        } else if (error.request) {
            // Si la requête est faite mais aucune réponse n'est reçue
            throw new Error('No response received');
        } else {
            // Si une erreur se produit lors de la configuration de la requête
            throw new Error('Request failed');
        }
    }
);

// Intercepteur pour ajouter le jeton d'authentification aux requêtes
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        throw new Error(error);
    }
);
