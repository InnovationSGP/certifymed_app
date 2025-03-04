import axiosInstance from "@/utils/axios";

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