import {api} from "./api";

export function login({ email, password }) {
    const data = { email, password };
    return api
        .post('/auth/signin/', data)
        .then(response => {
            if (response.data.token) {
                return response.data.token;
            } else {
                throw new Error('Token is null or undefined');
            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export function register(userData) {
    return api
        .post('/auth/signup', userData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export function user() {
    return api
        .get('/auth/me')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.message);
        });
}