import axiosInstance from '@/utils/axios';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/appointments';
export const getAppointments = async (token) => {
    console.log("debug 898: ", token);
    try {
        const response = await axios(`${API_BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("debug 999:", response.data);
        return response.data;
    } catch (error) {
        console.log("debug 666: ",error.message);
    }
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
    try {
        const response = await axiosInstance.post(
            `${API_BASE_URL}/create`,
            data
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
//Get doctor appointments
export const getAppointmentsDoctor = async (token) => {
    try {
        const reponse = await axios(`${API_BASE_URL}/doctor`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = reponse.data;
        console.log("debug 999:", data);
        return data;
    } catch (error) {
        console.log("debug 888: ", JSON.stringify(error));
    }
};
