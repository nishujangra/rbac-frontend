import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; // Replace with your backend URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle errors globally (optional)
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., token expiry)
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
});

export default axiosInstance;
