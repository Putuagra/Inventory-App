import axios from "axios"
import { GetAuth } from "../components/Auth"

const apiUrl = 'https://localhost:7020/api'

export const getAllTransactions = async () => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/Transaction`, { headers })
        return response?.data?.data || []
    } catch (error) {
        if (error.response.status === 404) {
            return []
        } else {
            throw error
        }
    }
}

export const getTransactionByGuid = async (transactionGuid) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/Transaction/${transactionGuid}`, { headers })
        return response?.data?.data || null
    }
    catch (error) {
        if (error.response.status === 404) {
            return null
        } else {
            throw error
        }
    }
}

export const create = async (createdTransaction) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.post(`${apiUrl}/Transaction`, createdTransaction, { headers })
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
        const response = await axios.put(`${apiUrl}/Transaction`, updatedData, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}

export const remove = async (transactionGuid) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.delete(`${apiUrl}/Transaction/${transactionGuid}`, { headers })
        return response.data
    } catch (error) {
        throw error
    }
}