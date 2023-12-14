import { useEffect, useState } from "react"
import { getByRole } from "../apis/UserAPI"
import { create, remove } from "../apis/UserRoleApi"
import { GetAuth, RemoveAuth } from "../components/Auth"
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

export default function UserRoleRepository(roleGuid) {
    const [users, setUsers] = useState([])
    const navigateAuthenticated = useNavigate()
    const navigateLogin = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = jwtDecode(storedToken)
            if (roleGuid) {
                fetchData()
            }
            const expirationTime = decode.exp * 1000
            const currentTime = Date.now()
            if (currentTime > expirationTime) {
                RemoveAuth()
                navigateLogin('/login')
            }
        } else if (!isAuthenticated) {
            navigateAuthenticated('/error401')
        }
    }, [roleGuid])

    const fetchData = async () => {
        try {
            if (roleGuid) {
                const data = await getByRole(roleGuid)
                setUsers(data)
            }
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    const handleCreate = async (newUserRole) => {
        try {
            await create(newUserRole)
        } catch (error) {
            console.error("Error create user role", error)
        }
    }

    const handleDelete = async (guid) => {
        try {
            const response = await remove(guid)
            if (users.length === 1) {
                setUsers([])
            }
            fetchData()
            return response
        } catch (error) {
            console.error('Error deleting user role:', error)
        }
    }

    return { users, handleDelete, handleCreate }
}