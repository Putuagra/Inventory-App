import axios from "axios"

const apiUrl = 'https://localhost:7020/api'
const token = localStorage.getItem('authToken')
const headers = {
    'Authorization': `Bearer ${token}`
}

export const getAllSuppliers = async (token) => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier`, { headers })
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
        const response = await axios.post(`${apiUrl}/Supplier`, userData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Supplier`, updatedData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (supllierGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Supplier/${supllierGuid}`, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier/ByEmail/${email}`, { headers })
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}

export const checkPhoneAvailability = async (phoneNumber) => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier/ByPhone/${phoneNumber}`, { headers })
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}

export const checkName = async (name) => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier/ByName/${name}`, { headers })
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}