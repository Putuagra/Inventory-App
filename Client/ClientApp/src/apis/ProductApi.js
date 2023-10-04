import axios from "axios";

const apiUrl = 'https://localhost:7020/api';

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Product`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const create = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/Product`, userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Product`, updatedData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const remove = async (productGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Product/${productGuid}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateStock = async (updatedStock) => {
    try {
        const response = await axios.put(`${apiUrl}/Product`, updatedStock)
        return response.data;
    } catch (error) {
        console.error('Error updating stock:', error);
        throw error;
    }
}