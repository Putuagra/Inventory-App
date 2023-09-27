import axios from "axios";

const apiUrl = 'https://localhost:7020/api';

export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const create = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/Supplier`, userData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Supplier`, updatedData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const remove = async (supllierGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Supplier/${supllierGuid}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};