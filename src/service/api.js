import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO :  Remove and add to .env
const baseURL = 'https://fa50-83-118-208-130.ngrok-free.app';

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for error
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Log the specific error message from the response
            console.error('Response error:', error.response.data.message || 'Something went wrong');
        } else if (error.request) {
            // Log a message for request-related errors
            console.error('Request error: No response received');
        } else {
            // Log a message for other configuration errors
            console.error('Request error: Configuration error');
        }

        // Throw the error to propagate it further if needed
        throw error;
    }
);

// Interceptor for add token jwt
api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        throw new Error(error);
    }
);

