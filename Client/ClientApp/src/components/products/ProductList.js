import React, { useState } from 'react'
import Button from '../Button'
import InputUpdate from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

export default function ProductList({ products, categories, suppliers, editingProduct, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCheckProduct, handleCategoryAvailability }) {

    const [name, setName] = useState('')
    const [supplier, setSupplier] = useState('')

    const handleNameEdit = (guid) => {
        const productToEdit = products.find((product) => product.guid === guid)
        setName(productToEdit.name)
    }

    const handleSupplierEdit = (guid) => {
        const productToEdit = products.find((product) => product.guid === guid)
        setSupplier(productToEdit.supplierGuid)
    }

    const handleUpdateProduct = async (data) => {
        const productPattern = /^[a-zA-Z0-9\s]+$/
        const stockPattern = /^\d+$/
        const pricePattern = /^\d+$/
        const descriptionPattern = /^[a-zA-Z0-9\s]+$/

        if (data.name === '' && data.stock === '' && data.price === '' && data.description === '' && data.supplierGuid === '' && data.categoryGuid === '') {
            ErrorAlert({ message: 'Semua field harus diisi.' })
            return
        }

        if (data.name === '') {
            ErrorAlert({ message: 'Nama harus diisi.' })
            return
        } else if (!productPattern.test(data.name)) {
            ErrorAlert({ message: 'Invalid format name.' })
            return
        }

        if (data.supplierGuid === '') {
            ErrorAlert({ message: 'Supplier harus diisi.' })
            return
        }

        if (data.categoryGuid === '') {
            ErrorAlert({ message: 'Category harus diisi.' })
            return
        }

        if (data.stock === '') {
            ErrorAlert({ message: 'Stock harus diisi.' })
            return;
        } else if (!stockPattern.test(data.stock)) {
            ErrorAlert({ message: 'Invalid format stock.' })
            return
        }

        if (data.price === '') {
            ErrorAlert({ message: 'Price harus diisi.' })
            return;
        } else if (!pricePattern.test(data.price)) {
            ErrorAlert({ message: 'Invalid format price.' })
            return
        }

        if (data.description === '') {
            ErrorAlert({ message: 'Description harus diisi.' })
            return;
        } else if (!descriptionPattern.test(data.description)) {
            ErrorAlert({ message: 'Invalid format description.' })
            return
        }

        const status = await handleCheckProduct(data.name, data.supplierGuid, data.categoryGuid)
        const statusCategory = await handleCategoryAvailability(data.categoryGuid, data.supplierGuid)
        
        if (status === 200 && name !== data.name) {
            ErrorAlert({ message: 'Product Name already exists in this category and supplier.' })
            return 
        }

        if (supplier !== data.supplierGuid) {
            if (statusCategory === 404) {
                ErrorAlert({ message: 'Category and supplier do not match.' })
                return
            }
        }

        if ((status === 404 && statusCategory === 200) || name === data.name) {
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Update product successful.' })
            } catch (error) {
                console.error('Error during update:', error)
                ErrorAlert({ message: 'Failed to update product. Please try again later.' })
            }
        } 
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Supplier</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(products) && products.length > 0 ? (
                        products.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <InputUpdate
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => handleInputChange(data.guid, 'name', e.target.value)}
                                            />
                                        ) : (
                                            data.name
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <Select
                                                name="supplierGuid"
                                                label="Supplier"
                                                value={data.supplierGuid}
                                                onChange={(e) => handleInputChange(data.guid, 'supplierGuid', e.target.value)}
                                                options={suppliers}
                                            />
                                        ) : (
                                            (suppliers.find((supplier) => supplier.guid === data.supplierGuid) || {}).name
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <Select
                                                name="categoryGuid"
                                                label="Category"
                                                value={data.categoryGuid}
                                                onChange={(e) => handleInputChange(data.guid, 'categoryGuid', e.target.value)}
                                                options={categories.filter((category) => category.supplierGuid === data.supplierGuid)}
                                            />
                                        ) : (
                                            (categories.find((category) => category.guid === data.categoryGuid) || {}).name
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <InputUpdate
                                                name="stock"
                                                type="number"
                                                value={data.stock}
                                                onChange={(e) => handleInputChange(data.guid, 'stock', e.target.value)}
                                            />
                                        ) : (
                                            data.stock
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <InputUpdate
                                                name="price"
                                                type="number"
                                                value={data.price}
                                                onChange={(e) => handleInputChange(data.guid, 'price', e.target.value)}
                                            />
                                        ) : (
                                            data.price
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <InputUpdate
                                                name="description"
                                                type="text"
                                                value={data.description}
                                                onChange={(e) => handleInputChange(data.guid, 'description', e.target.value)}
                                            />
                                        ) : (
                                            data.description
                                        )
                                    }
                                </td>
                                <td>
                                    {editingProduct === data.guid ? (
                                        <Button
                                            name="Save" 
                                            className="btn btn-success"
                                            onClick={() => handleUpdateProduct(data)}
                                        />
                                    ) : (
                                        <>
                                                <Button
                                                    name="Edit"
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        handleNameEdit(data.guid)
                                                        handleSupplierEdit(data.guid)
                                                        handleEdit(data.guid)
                                                    }}
                                                />
                                                <Button
                                                    name="Delete"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(data.guid)}
                                                />
                                        </>
                                    )}
                                </td>
                            </tr>
                        )
                        )
                    ) : (
                        <tr>
                            <td colSpan="3">No user data available.</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}