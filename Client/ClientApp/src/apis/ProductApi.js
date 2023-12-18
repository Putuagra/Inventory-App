import axios from "axios"
import { GetAuth } from "../components/Auth"

const apiUrl = 'https://localhost:7020/api'

export const getAllProducts = async () => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
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
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.post(`${apiUrl}/Product`, userData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const update = async (updatedData) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.put(`${apiUrl}/Product`, updatedData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (productGuid) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.delete(`${apiUrl}/Product/${productGuid}`, { headers })
        return response
    } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 400) {
            return 400
        }
    }
}

export const updateStock = async (updatedStock) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.put(`${apiUrl}/Product`, updatedStock, { headers })
        return response.data
    } catch (error) {
        console.error('Error updating stock:', error)
        throw error
    }
}

export const checkProductAvailability = async (name, supplierGuid, categoryGuid) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/Product/CheckDuplicate/${name}/${supplierGuid}/${categoryGuid}`, { headers })
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}

export const GetProductById = async (guid) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/Product/${guid}`, { headers })
        return response
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}