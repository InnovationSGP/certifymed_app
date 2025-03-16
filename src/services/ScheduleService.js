import axiosInstance from "@/utils/axios";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/doctor/timings';

export const getAllDoctorSchedules = async (id) => {
    const reponse = await axiosInstance.get(`${API_BASE_URL}/patients/${id}`,);
    const data = reponse.data;
    return data;
};

export const createMultipleSchedule = async (timings) => {
    const response = await axiosInstance.post(`${API_BASE_URL}/mul`, { timings });
    return response.data;
};
export const updateSchedule = async (id, data) => {
    const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
}
export const deleteSchedule = async (id) => {
    const response = await axiosInstance.delete(`${API_BASE_URL}/${id}`);
    return response.data;
}
export const getAllDoctorTiming = async (token) => {
    const reponse = await axios.get(`${API_BASE_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = reponse.data;
    return data;
};