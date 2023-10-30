import axios from "axios"

const apiUrl = 'https://localhost:7020/api'

export const getAllSuppliers = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier`)
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
        const response = await axios.post(`${apiUrl}/Supplier`, userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Supplier`, updatedData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (supllierGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Supplier/${supllierGuid}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/Supplier/ByEmail/${email}`)
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
        const response = await axios.get(`${apiUrl}/Supplier/ByPhone/${phoneNumber}`)
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
        const response = await axios.get(`${apiUrl}/Supplier/ByName/${name}`)
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}