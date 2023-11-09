import axios from "axios"

const apiUrl = 'https://localhost:7020/api'
const token = localStorage.getItem('authToken')
const headers = {
    'Authorization': `Bearer ${token}`
}

export const getAllProducts = async (token) => {
    try {
        const response = await axios.get(`${apiUrl}/Product`, { headers })
        return response?.data?.data || []
    } catch (error) {
        if (error.response.status === 404) {
            return []
        } else {
            throw error
        }
    }
}

export const create = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/Product`, userData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Product`, updatedData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (productGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Product/${productGuid}`, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateStock = async (updatedStock) => {
    try {
        const response = await axios.put(`${apiUrl}/Product`, updatedStock, { headers })
        return response.data
    } catch (error) {
        console.error('Error updating stock:', error)
        throw error
    }
}

export const checkProductAvailability = async (name, supplierGuid, categoryGuid) => {
    try {
        const response = await axios.get(`${apiUrl}/Product/CheckDuplicate/${name}/${supplierGuid}/${categoryGuid}`, { headers })
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
};