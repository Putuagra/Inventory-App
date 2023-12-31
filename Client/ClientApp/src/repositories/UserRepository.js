import { useState, useEffect } from 'react'
import { getAll, create, update, remove, GetUserById } from '../apis/UserAPI'
import { useNavigate } from 'react-router-dom'
import { GetAuth, GetTokenClaim, RemoveAuth } from '../components/Auth'

export default function UserRepository() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = GetTokenClaim(storedToken)
            const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            if (rolesClaim.includes("Admin")) {
                fetchData()
                const expirationTime = decode.exp * 1000
                const currentTime = Date.now()
                if (currentTime > expirationTime) {
                    RemoveAuth()
                    navigate('/login')
                }
            } else {
                navigate('/error403')
            }
        } else if (!isAuthenticated) {
            navigate('/error401')
        }
    }, [])

    const fetchData = async () => {
        try {
            const data = await getAll()
            setUsers(data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newUser) => {
        try {
            await create(newUser)
            fetchData()
        } catch (error) {
            console.error("Error create user", error)
        }
    }

    const handleUpdate = async (updatedUser) => {
        try {
            await update(updatedUser)
            fetchData()
        } catch (error) {
            console.error('Error editing user:', error)
        }
    }

    const handleDelete = async (userGuid) => {
        try {
            const response = await remove(userGuid)
            if (users.length === 1) {
                setUsers([])
            }
            fetchData()
            return response
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    const handleGetUserById = async (guid) => {
        try {
            return await GetUserById(guid)
        } catch (error) {
            console.error('Error sending get user request:', error)
        }
    }

    return { users, handleUpdate, handleDelete, handleGetUserById }
}