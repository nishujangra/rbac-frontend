/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axiosInstance';

const API_URL = '/api/timesheets';

// Fetch all timesheets for the logged-in employee
export const getMyTimesheets = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/mine`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch timesheets');
    }
};

// Submit a new timesheet
export const submitTimesheet = async (data: {
    date: string;
    hoursWorked: string;
    description: string;
}) => {
    try {
        const response = await axiosInstance.post(API_URL, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to submit timesheet');
    }
};


// Fetch department timesheets (Manager only)
export const viewAllTimesheets = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
};

// Update timesheet status (approve/reject) (Manager only)
export const updateTimesheetStatus = async (id: string, status: "approved" | "rejected") => {
    const response = await axiosInstance.put(`/api/timesheets/${id}`, { status });
    return response.data;
};