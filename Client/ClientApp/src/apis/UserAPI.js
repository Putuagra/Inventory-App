import axios from "axios";

const apiUrl = 'https://localhost:7020/api';

export const getAll = async () => {
    try {
        const response = await axios.get(`${apiUrl}/User`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const create = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/User`, userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/User`, updatedData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const remove = async (userId) => {
    try {
        const response = await axios.delete(`${apiUrl}/User/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/User/register`, userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/User/ByEmail/${email}`);
        return response.status;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404;
        }
        console.error('Error during API request:', error);
    }
};