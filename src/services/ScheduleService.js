import axiosInstance from '@/utils/axios';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/doctor/timings';

export const getAllDoctorSchedules = async (id) => {
    try {
        const reponse = await axiosInstance.get(
            `${API_BASE_URL}/patients/${id}`
        );
        return reponse.data;
    } catch (error) {
        console.log(error);
    }
};

export const createMultipleSchedule = async (timings) => {
    try {
        const response = await axiosInstance.post(`${API_BASE_URL}/mul`, {
            timings
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateSchedule = async (id, data) => {
    try {
        const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteSchedule = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllDoctorTiming = async (token) => {
    try {
        const reponse = await axios.get(`${API_BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return reponse.data;
    } catch (error) {
        console.log(error);
    }
};
