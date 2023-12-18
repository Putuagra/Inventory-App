import { useState, useEffect } from 'react'
import { getAllSuppliers } from '../apis/SupplierApi'
import { getAll} from '../apis/CategoryApi'
import { getAllProducts, create, update, remove, GetProductById } from '../apis/ProductApi'
import { GetAuth, RemoveAuth } from '../components/Auth'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

export default function ProductRepository() {
    const [products, setProducts] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)
    const navigateAuthenticated = useNavigate()
    const navigateLogin = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            const decode = jwtDecode(storedToken)
            fetchData()
            fetchDataSuppliers()
            fetchDataCategories()
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
            const data = await getAllProducts()
            setProducts(data)
        } catch (error) {
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

    const fetchDataCategories = async () => {
        try {
            const data = await getAll()
            setCategories(data)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newProduct) => {
        try {
            await create(newProduct)
            fetchData()
        }
        catch (error) {
            console.error("Error create product", error)
        }
    }

    const handleEdit = (productGuid) => {
        setEditingProduct(productGuid)
    }

    const handleInputChange = (productGuid, field, value) => {
        const updatedProducts = products.map((product) => (product.guid === productGuid ? { ...product, [field]: value } : product))
        setProducts(updatedProducts)
    }

    const handleUpdate = async (updatedProduct) => {
        try {
            await update(updatedProduct)
            setEditingProduct(null)
            fetchData()
        }
        catch (error) {
            console.error('Error editing product:', error)
        }
    }

    const handleDelete = async (productGuid) => {
        try {
            const response = await remove(productGuid);
            if (products.length === 1) {
                setProducts([])
            }
            fetchData()
            return response
        }
        catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    const handleGetProductById = async (guid) => {
        try {
            return await GetProductById(guid)
        } catch (error) {
            console.error('Error sending get product request:', error)
        }
    }

    return {
        products, categories, suppliers, editingProduct, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCreate, handleGetProductById
    }
}