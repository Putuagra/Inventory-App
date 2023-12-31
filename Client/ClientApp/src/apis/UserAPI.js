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

export const getByRole = async (roleGuid) => {
    try {
        const response = await axios.get(`${apiUrl}/User/GetByRole/${roleGuid}`)
        return response?.data?.data || []
    } catch (error) {
        if (error.response.status === 404) {
            return []
        } else {
            throw error
        }
    }
}

export const getExcludeRole = async (roleGuid) => {
    try {
        const response = await axios.get(`${apiUrl}/User/GetExcludeRole/${roleGuid}`)
        return response?.data?.data || []
    } catch (error) {
        if (error.response.status === 404) {
            return []
        } else {
            throw error
        }
    }
}

export const GetUserById = async (guid) => {
    const token = await GetAuth()
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await axios.get(`${apiUrl}/User/${guid}`, { headers })
        return response
    }
    catch (error) {
        if (error.response && error.response.status === 404) {
            return 404
        }
        console.error('Error during API request:', error)
    }
}