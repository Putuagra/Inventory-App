import { useState, useEffect } from 'react'
import { getAll, create, update, remove} from '../apis/CategoryApi'
import { getAllSuppliers } from '../apis/SupplierApi'
import { GetAuth, RemoveAuth } from '../components/Auth'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

export default function CategoryRepository() {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null)
    const navigateAuthenticated = useNavigate()
    const navigateLogin = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {       
            const decode = jwtDecode(storedToken)
            fetchData()
            fetchDataSuppliers()
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
            const data = await getAll()
            setCategories(data)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const fetchDataSuppliers = async () => {
        try {
            const data = await getAllSuppliers()
            setSuppliers(data)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newCategory) => {
        try {
            await create(newCategory)
            fetchData()
        }
        catch (error) {
            console.error("Error create category", error)
        }
    }

    const handleEdit = (categoryGuid) => {
        setEditingCategory(categoryGuid)
    }

    const handleInputChange = (categoryGuid, field, value) => {
        const updatedCategories = categories.map((category) => (category.guid === categoryGuid ? { ...category, [field]: value } : category))
        setCategories(updatedCategories)
    }

    const handleUpdate = async (updatedCategory) => {
        try {
            await update(updatedCategory)
            setEditingCategory(null)
            fetchData()
        }
        catch (error) {
            console.error('Error editing category:', error)
        }
    }

    const handleDelete = async (categoryGuid) => {
        try {
            const response = await remove(categoryGuid)
            if (categories.length === 1) {
                setCategories([])
            }
            fetchData()
            return response
        }
        catch (error) {
            console.error('Error deleting category:', error)
        }
    }
    return {
        categories, suppliers, editingCategory, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCreate
    }
}