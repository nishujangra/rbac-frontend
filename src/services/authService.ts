import axiosInstance from './axiosInstance';

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/api/auth/login', { email, password });
    return response.data;
};

export const register = async (name: string, email: string, password: string, role: string, department?: string) => {
    const response = await axiosInstance.post('/api/auth/register', { name, email, password, role, department });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};