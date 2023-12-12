import axios from "axios"
import { GetAuth } from "../components/Auth"

const apiUrl = 'https://localhost:7020/api'

export const getAll = async () => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/User`, {headers})
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
        const response = await axios.post(`${apiUrl}/User`, userData, { headers })
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
        const response = await axios.put(`${apiUrl}/User`, updatedData, { headers })
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const remove = async (userId) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.delete(`${apiUrl}/User/${userId}`, { headers })
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
        const response = await axios.post(`${apiUrl}/User/register`, userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const login = async (userData) => {
    try {
        const response = await axios.post(`${apiUrl}/User/login`, userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/User/ByEmail/${email}`)
        return response.status
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${apiUrl}/User/ForgotPassword`, JSON.stringify({ email }), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.status
    } catch (error) {
        /*throw error*/
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
        const response = await axios.post(`${apiUrl}/User/ChangePassword`, data)
        return response.status
    } catch (error) {
        /* throw error*/
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

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${apiUrl}/User/ByEmail/${email}`)
        return response
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}