import { useState, useEffect } from 'react'
import { getAllSuppliers, create, update, remove, GetSupplierById, checkEmailAvailability, checkPhoneAvailability, checkName } from '../apis/SupplierApi'
import { useNavigate } from 'react-router-dom'
import { GetAuth, GetTokenClaim, RemoveAuth } from '../components/Auth'

export default function SupplierRepository() {
    const [suppliers, setSuppliers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = GetTokenClaim(storedToken)
            fetchData()
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
            const data = await getAllSuppliers()
            setSuppliers(data)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newSupplier) => {
        try {
            await create(newSupplier)
            fetchData()
        }
        catch (error) {
            console.error("Error create supplier", error)
        }
    }

    const handleUpdate = async (updatedSupplier) => {
        try {
            await update(updatedSupplier)
            fetchData()
        }
        catch (error) {
            console.error('Error editing supplier:', error)
        }
    }

    const handleDelete = async (supplierGuid) => {
        try {
            const response = await remove(supplierGuid)
            if (suppliers.length === 1) {
                setSuppliers([])
            }
            fetchData()
            return response
        }
        catch (error) {
            console.error('Error deleting supplier request:', error)
        }
    }

    const handleGetSupplierById = async (guid) => {
        try {
            return await GetSupplierById(guid)
        } catch (error) {
            console.error('Error sending get supplier request:', error)
        }
    }

    const handleCheckSupplierEmail = async (email) => {
        try {
            return await checkEmailAvailability(email)
        } catch (error) {
            console.error('Error sending check supplier email request:', error)
        }
    }

    const handleCheckSupplierPhone = async (phoneNumber) => {
        try {
            return await checkPhoneAvailability(phoneNumber)
        } catch (error) {
            console.error('Error sending check supplier phone number request:', error)
        }
    }

    const handleCheckSupplierName = async (name) => {
        try {
            return await checkName(name)
        } catch (error) {
            console.error('Error sending check supplier name request:', error)
        }
    }

    return {
        suppliers, handleUpdate, handleDelete, handleCreate, handleGetSupplierById, handleCheckSupplierEmail, handleCheckSupplierPhone, handleCheckSupplierName
    }
}