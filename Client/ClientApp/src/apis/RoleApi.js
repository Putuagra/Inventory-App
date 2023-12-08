import axios from "axios"
import { GetAuth } from "../components/Auth"

const apiUrl = 'https://localhost:7020/api'

export const getAll = async () => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/Role`, { headers })
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
        const response = await axios.post(`${apiUrl}/Role`, userData, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

export const update = async (updatedData) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.put(`${apiUrl}/Role`, updatedData, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

export const remove = async (roleId) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.delete(`${apiUrl}/Role/${roleId}`, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}