import React, { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import ProductValidation from '../../Validation/ProductValidation'

export default function ProductForm({ handleCreate, suppliers, categories, handleCheckProduct }) {
    const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewProduct({ ...newProduct, [name]: value })
    }

    const handleSupplierChange = (e) => {
        const selectedSupplierGuid = e.target.value;
        setNewProduct({
            ...newProduct,
            supplierGuid: selectedSupplierGuid,
            categoryGuid: '',
        })
    }

    const handleCreateProduct = async () => {
        const productPattern = /^[a-zA-Z0-9\s]+$/
        const stockPattern = /^\d+$/
        const pricePattern = /^\d+$/
        const descriptionPattern = /^[a-zA-Z0-9\s]+$/
        if (!newProduct.name || !newProduct.stock || !newProduct.price || !newProduct.description || !newProduct.supplierGuid || !newProduct.categoryGuid) {
            return
        }

        if (!productPattern.test(newProduct.name) ||
            !stockPattern.test(newProduct.stock) ||
            !pricePattern.test(newProduct.price) ||
            !descriptionPattern.test(newProduct.description)
        ) {
            return
        }

        const status = await handleCheckProduct(newProduct.name, newProduct.supplierGuid, newProduct.categoryGuid)
        if (status === 200) {
            ErrorAlert({ message: 'Product Name already exists in this category and supplier.' })
        } else if (status === 404) {
            try {
                await handleCreate(newProduct);
                setNewProduct({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' })
                SuccessAlert({ message: 'Add product successful.' })
            } catch (error) {
                console.error('Error during add:', error)
                ErrorAlert({ message: 'Failed to add product. Please try again later.' })
            }
        } else {
            ErrorAlert({ message: 'Failed to check product availability. Please try again later.' })
        }   
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(ProductValidation(newProduct))
        handleCreateProduct()
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
            <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
            >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={handleChange}
                        errors={errors.name}
                    />
                    <Select
                        name="supplierGuid"
                        label="Supplier"
                        value={newProduct.supplierGuid}
                        onChange={handleSupplierChange}
                        options={suppliers}
                    />
                    <Select
                        name="categoryGuid"
                        label="Category"
                        value={newProduct.categoryGuid}
                        onChange={handleChange}
                        options={categories.filter((category) => category.supplierGuid === newProduct.supplierGuid)}
                    />
                    <Input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={handleChange}
                        errors={errors.stock}
                    />
                    <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={handleChange}
                        errors={errors.price}
                    />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={handleChange}
                        errors={errors.description}
                    />
                    <Button
                        name="Add Product"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}