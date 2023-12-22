import axios from "axios"
import { GetAuth } from "../components/Auth"

const apiUrl = 'https://localhost:7020/api'

export const getAll = async () => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/Account`, { headers })
        return response?.data?.data || []
    } catch (error) {
        if (error.response.status === 404) {
            return []
        } else {
            throw error
        }
    }
}

export const create = async (accountData) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.post(`${apiUrl}/Account`, accountData, { headers })
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
        const response = await axios.put(`${apiUrl}/Account`, updatedData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (accountId) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.delete(`${apiUrl}/Account/${accountId}`, { headers })
        return response
    } catch (error) {
        console.log(error)
        if (error.response && error.response.status === 400) {
            return 400
        }
    }
}

export const register = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/Account/register`, userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const login = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/Account/login`, userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${apiUrl}/Account/ForgotPassword`, JSON.stringify({ email }), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        if (error.response && error.response.status === 500) {
            return 500
        }
        console.error('Error during API request:', error)
    }
}

export const changePassword = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/Account/ChangePassword`, data)
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        if (error.response && error.response.status === 400) {
            return 400
        }
        if (error.response && error.response.status === 500) {
            return 500
        }
        console.error('Error during API request:', error)
    }
}