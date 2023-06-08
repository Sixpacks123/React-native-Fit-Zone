import axios from 'axios';

// TODO :  Remove and add to .env
const baseURL = 'https://54dc-79-174-199-126.ngrok-free.app';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
            throw new Error(error.response?.data?.message || 'Something went wrong');
        });
}

export function register(userData) {
    return api
        .post('/auth/signup', userData)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        });
}

export function user(token) {
    return api
        .get('/auth/me', {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.response?.data?.message || 'Error');
        });
}