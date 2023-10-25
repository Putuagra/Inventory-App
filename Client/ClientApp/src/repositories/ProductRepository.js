import React, { useState, useEffect } from 'react'
import { getAllSuppliers } from '../apis/SupplierApi'
import { getAll, checkAvailability, checkDuplicate } from '../apis/CategoryApi'
import { getAllProducts, create, update, remove, checkProductAvailability } from '../apis/ProductApi'
import ProductForm from '../components/products/ProductForm'
import ProductList from '../components/products/ProductList'

export default function ProductRepository() {
    const [products, setProducts] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])
    const [editingProduct, setEditingProduct] = useState(null)

    useEffect(() => {
        fetchData()
        fetchDataSuppliers()
        fetchDataCategories()
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
    };

    const fetchDataCategories = async () => {
        try {
            const data = await getAll()
            setCategories(data)
        }
        catch (error) {
            console.error("Error fetching data: ", error)
        }
    };

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
            await remove(productGuid);
            if (products.length === 1) {
                setProducts([])
            }
            fetchData()
        }
        catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    return (
        <div className="container">
            <h1>Products</h1>
            <ProductList
                products={products}
                categories={categories}
                suppliers={suppliers}
                editingProduct={editingProduct}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleCheckProduct={checkProductAvailability}
                handleCategoryAvailability={checkAvailability}
            />
            <ProductForm
                handleCreate={handleCreate}
                suppliers={suppliers}
                categories={categories}
                handleDuplicate={checkDuplicate}
            />
        </div>
    )
}