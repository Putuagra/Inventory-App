import { useState, useEffect } from 'react'
import { getAllSuppliers, create, update, remove } from '../apis/SupplierApi'
import { useNavigate } from 'react-router-dom'
import { GetAuth, RemoveAuth } from '../components/Auth'
import { jwtDecode } from "jwt-decode"

export default function SupplierRepositories() {
    const [suppliers, setSuppliers] = useState([])
    const [editingSupplier, setEditingSupplier] = useState(null)
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
            const data = await getAllSuppliers()
            setSuppliers(data)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
    };

    const handleCreate = async (newSupplier) => {
        try {
            await create(newSupplier)
            fetchData()
        }
        catch (error) {
            console.error("Error create supplier", error)
        }
    };

    const handleEdit = (supplierGuid) => {
        setEditingSupplier(supplierGuid)
    };

    const handleInputChange = (supplierGuid, field, value) => {
        const updatedSuplliers = suppliers.map((supplier) => (supplier.guid === supplierGuid ? { ...supplier, [field]: value } : supplier))
        setSuppliers(updatedSuplliers)
    };

    const handleUpdate = async (updatedSupplier) => {
        try {
            await update(updatedSupplier)
            setEditingSupplier(null)
            fetchData()
        }
        catch (error) {
            console.error('Error editing supplier:', error)
        }
    }

    const handleDelete = async (supplierGuid) => {
        try {
            await remove(supplierGuid)
            if (suppliers.length === 1) {
                setSuppliers([])
            }
            fetchData()
        }
        catch (error) {
            if (error.response.status === 400) {
                console.error('Error deleting supplier:', error.response.data.message)
                alert("error while delete")
            } else {
                console.error('Unexpected error deleting supplier:', error);
            }
        }
    }
    return {
        suppliers, editingSupplier, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCreate
    }
}