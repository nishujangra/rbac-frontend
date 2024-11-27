import axiosInstance from './axiosInstance';

export const getAllUser = async () => {
    const response = await axiosInstance.get("/api/users");
    return response.data;
}