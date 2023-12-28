import { useState, useEffect } from 'react'
import { getAll, create, update, remove, GetCategoryById, checkAvailability, checkDuplicate} from '../apis/CategoryApi'
import { getAllSuppliers } from '../apis/SupplierApi'
import { GetAuth, GetTokenClaim, RemoveAuth } from '../components/Auth'
import { useNavigate } from 'react-router-dom'

export default function CategoryRepository() {
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {       
            const decode = GetTokenClaim(storedToken)
            fetchData()
            fetchDataSuppliers()
            const expirationTime = decode.exp * 1000
            const currentTime = Date.now()
            if (currentTime > expirationTime) {
                RemoveAuth()
                navigate('/login')
            }
        } else if (!isAuthenticated) {
            navigate('/error401')
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

    const handleUpdate = async (updatedCategory) => {
        try {
            await update(updatedCategory)
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

    const handleCheckCategoryAvailability = async (categoryGuid, supplierGuid) => {
        try {
            return await checkAvailability(categoryGuid, supplierGuid)
        } catch (error) {
            console.error('Error sending check category availability request:', error)
        }
    }

    const handleCheckCategoryDuplicate = async (name, supplierGuid) => {
        try {
            return await checkDuplicate(name, supplierGuid)
        } catch (error) {
            console.error('Error sending check category duplicate request:', error)
        }
    }

    const handleGetCategoryById = async (guid) => {
        try {
            return await GetCategoryById(guid)
        } catch (error) {
            console.error('Error sending get category request:', error)
        }
    }

    return {
        categories, suppliers, handleUpdate, handleDelete, handleCreate, handleGetCategoryById, handleCheckCategoryAvailability, handleCheckCategoryDuplicate
    }
}