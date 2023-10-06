import axios from "axios"

const apiUrl = 'https://localhost:7020/api'

export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${apiUrl}/Transaction`)
        return response.data.data
    } catch (error) {
        throw error
    }
}

export const getTransactionByGuid = async (transactionGuid) => {
    try {
        const response = await axios.get(`${apiUrl}/Transaction/${transactionGuid}`)
        return response.data.data
    }
    catch (error) {
        throw error
    }
}

export const create = async (createdTransaction) => {
    try {
        const response = await axios.post(`${apiUrl}/Transaction`, createdTransaction)
        return response.data
    } catch (error) {
        throw error
    }
}

export const update = async (updatedData) => {
    try {
        const response = await axios.put(`${apiUrl}/Transaction`, updatedData)
        return response.data
    } catch (error) {
        throw error
    }
}

export const remove = async (transactionGuid) => {
    try {
        const response = await axios.delete(`${apiUrl}/Transaction/${transactionGuid}`)
        return response.data
    } catch (error) {
        throw error
    }
}