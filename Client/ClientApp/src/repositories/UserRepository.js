import { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../apis/UserAPI'
import { useNavigate } from 'react-router-dom'
import { GetAuth } from '../components/Auth'
import { jwtDecode } from "jwt-decode"

export default function UserRepository() {
    const [users, setUsers] = useState([])
    const [nameDecode, setNameDecode] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const navigateAuthenticated = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        console.log('Tokennnnnn:', storedToken)
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = jwtDecode(storedToken)
            setNameDecode(decode.Name)
            fetchData()
        } else if (!isAuthenticated) {
            navigateAuthenticated('/error401')
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

    /*const handleCreate = async (newUser) => {
        try {
            await create(newUser)
            fetchData()
        } catch (error) {
            console.error("Error create user", error)
        }
    }*/

    const handleEdit = (userGuid) => {
        setEditingUser(userGuid)
    }

    const handleInputChange = (userGuid, field, value) => {
        const updatedUsers = users.map((user) => (user.guid === userGuid ? { ...user, [field]: value } : user));
        setUsers(updatedUsers)
    }

    const handleUpdate = async (updatedUser) => {
        try {
            await update(updatedUser)
            setEditingUser(null)
            fetchData()
        } catch (error) {
            console.error('Error editing user:', error)
        }
    }

    const handleDelete = async (userGuid) => {
        try {
            await remove(userGuid)
            if (users.length === 1) {
                setUsers([])
            }
            fetchData()
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    return { users, editingUser, handleEdit, handleInputChange, handleUpdate, handleDelete, nameDecode }
}