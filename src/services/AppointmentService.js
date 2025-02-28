import axiosInstance from '@/utils/axios';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/appointments';
export const getAppointments = async (token) => {
    const reponse = await axios(`${API_BASE_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = reponse.data;
    return data;
};

export const searchDoctor = async (city) => {
    const reponse = await axiosInstance(`${API_BASE_URL}/search/doctor`, {
        params: {
            city
        }
    });
    const data = reponse.data;
    return data;
};

export const createAppointment = async (data) => {
    const reponse = await axiosInstance.post(`${API_BASE_URL}/create`, data);
    const response = reponse.data;
    return response;
};

export const getAppointmentsDoctor = async (token) => {
    const reponse = await axios(`${API_BASE_URL}/doctor`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = reponse.data;
    return data;
};