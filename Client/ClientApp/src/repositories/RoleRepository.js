import { useEffect, useState } from "react"
import { GetRoleById, checkRole, create, getAllRoles, remove, update } from "../apis/RoleApi"
import { GetAuth, GetTokenClaim, RemoveAuth } from "../components/Auth"
import { useNavigate } from 'react-router-dom'

export default function RoleRepository() {
    const [roles, setRoles] = useState([])
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
            const data = await getAllRoles()
            setRoles(data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newRole) => {
        try {
            await create(newRole)
            fetchData()
        } catch (error) {
            console.error("Error create role", error)
        }
    }

    const handleUpdate = async (updatedRole) => {
        try {
            await update(updatedRole)
            fetchData()
        } catch (error) {
            console.error('Error editing role:', error)
        }
    }

    const handleDelete = async (roleGuid) => {
        try {
            const response = await remove(roleGuid)
            if (roles.length === 1) {
                setRoles([])
            }
            fetchData()
            return response
        } catch (error) {
            console.error('Error deleting role:', error)
        }
    }

    const handleCheckRole = async (name) => {
        try {
            return await checkRole(name)
        } catch (error) {
            console.error('Error sending check role request:', error)
        }
    }

    const handleGetRoleById = async (guid) => {
        try {
            return await GetRoleById(guid)
        } catch (error) {
            console.error('Error sending get role request:', error)
        }
    }

    return {
        roles, handleUpdate, handleDelete, handleCreate, handleGetRoleById, handleCheckRole
    }
}