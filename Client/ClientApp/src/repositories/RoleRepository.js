import { useEffect, useState } from "react"
import { GetRoleById, create, getAllRoles, remove, update } from "../apis/RoleApi"
import { GetAuth, RemoveAuth } from "../components/Auth"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom'

export default function RoleRepository() {
    const [roles, setRoles] = useState([])
    const [editingRole, setEditingRole] = useState(null)
    const navigateAuthenticated = useNavigate()
    const navigateLogin = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = jwtDecode(storedToken)
            fetchData()
            const expirationTime = decode.exp * 1000
            const currentTime = Date.now()
            if (currentTime > expirationTime) {
                RemoveAuth()
                navigateLogin('/login')
            }
        } else if (!isAuthenticated) {
            navigateAuthenticated('/error401')
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

    const handleEdit = (roleGuid) => {
        setEditingRole(roleGuid)
    }

    const handleInputChange = (roleGuid, field, value) => {
        const updatedRoles = roles.map((role) => (role.guid === roleGuid ? { ...role, [field]: value } : role))
        setRoles(updatedRoles)
    }

    const handleUpdate = async (updatedRole) => {
        try {
            await update(updatedRole)
            setEditingRole(null)
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

    const handleGetRoleById = async (guid) => {
        try {
            return await GetRoleById(guid)
        } catch (error) {
            console.error('Error sending get role request:', error)
        }
    }

    return {
        roles, editingRole, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCreate, handleGetRoleById
    }
}