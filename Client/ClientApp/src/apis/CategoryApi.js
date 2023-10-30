import axios from "axios"

const apiUrl = 'https://localhost:7020/api'

export const getAll = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Category`)
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
        const response = await axios.post(`${apiUrl}/Category`, userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Category`, updatedData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (supllierGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Category/${supllierGuid}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkAvailability = async (categoryGuid, supplierGuid) => {
    try {
        const response = await axios.get(`${apiUrl}/Category/CheckAvailability/${categoryGuid}/${supplierGuid}`)
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}

export const checkDuplicate = async (name, supplierGuid) => {
    try {
        const response = await axios.get(`${apiUrl}/Category/CheckDuplicate/${name}/${supplierGuid}`)
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}