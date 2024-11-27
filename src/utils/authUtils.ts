import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    id: string;
    role: string;
    exp: number;
}

export const getUserRole = (): string | null => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.role; // Return the user's role
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};