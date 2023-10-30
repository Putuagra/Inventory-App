import React, { useState } from 'react'
import Button from '../Button'
import InputUpdate from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import DeleteAlert from '../DeleteAlert'
import { ValidateData, ValidationDuplicate } from '../../Validation/Products/ProductValidation'

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
        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleCheckProduct(data.name, data.supplierGuid, data.categoryGuid)
        const statusCategory = await handleCategoryAvailability(data.categoryGuid, data.supplierGuid)
        
        const validationDuplicate = ValidationDuplicate(data, name, supplier, status, statusCategory)

        if (validationDuplicate) {
            ErrorAlert({ message: validationDuplicate })
            return
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
                                                    onClick={() => DeleteAlert({ handleDelete, guid: data.guid })}
                                                />
                                        </>
                                    )}
                                </td>
                            </tr>
                        )
                        )
                    ) : (
                        <tr>
                            <td colSpan="3">No product available.</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}