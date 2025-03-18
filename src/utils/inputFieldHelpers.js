import axios from 'axios';

export const validatePhone = async (code, phone) => {
    const response = await axios.get(
        `/api/validatePhone?number=${code}${phone}`
    );
    return response.data.is_valid;
};

export const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
