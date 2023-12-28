import { useEffect, useState } from "react"
import { getByRole } from "../apis/UserAPI"
import { GetAuth, GetTokenClaim, RemoveAuth } from "../components/Auth"
import { useNavigate } from 'react-router-dom'
import { create, remove } from "../apis/AccountRoleApi"

export default function AccountRoleRepository(roleGuid) {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = GetTokenClaim(storedToken)
            const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            if (rolesClaim.includes("Admin")) {
                if (roleGuid) {
                    fetchData()
                }
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

    const handleCreate = async (newAccountRole) => {
        try {
            await create(newAccountRole)
        } catch (error) {
            console.error("Error create account role", error)
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
            console.error('Error deleting account role:', error)
        }
    }

    return { users, handleDelete, handleCreate }
}