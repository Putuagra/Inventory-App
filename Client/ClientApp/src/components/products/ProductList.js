import React, { useState } from 'react'
import Button from '../Button'
import InputUpdate from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import DeleteAlert from '../DeleteAlert'
import { ValidateData, ValidationDuplicate } from '../../Validation/Products/ProductValidation'

const cardStyle = {
    maxWidth: '20rem',
}
export default function ProductList(props) {

    const { products, categories, suppliers, editingProduct, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCheckProduct, handleCategoryAvailability } = props

    const [name, setName] = useState('')
    const [supplier, setSupplier] = useState('')
    const [category, setCategory] = useState('')

    const handleNameEdit = (guid) => {
        const productToEdit = products.find((product) => product.guid === guid)
        setName(productToEdit.name)
    }

    const handleSupplierEdit = (guid) => {
        const productToEdit = products.find((product) => product.guid === guid)
        setSupplier(productToEdit.supplierGuid)
    }

    const handleCategoryEdit = (guid) => {
        const productToEdit = products.find((product) => product.guid === guid)
        setCategory(productToEdit.categoryGuid)
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

        if ((status === 404 && statusCategory === 200 && name !== data.name) || (name === data.name && supplier === data.supplierGuid && category === data.categoryGuid) || (name === data.name && status === 404 && statusCategory === 200)) {
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Update product successful.' })
            } catch (error) {
                console.error('Error during update:', error)
                ErrorAlert({ message: 'Failed to update product. Please try again later.' })
            }
        }
        else if (status === 200 && statusCategory === 200) {
            ErrorAlert({ message: 'The updated product already exists or is invalid' })
        }
    }

    return (
        <div className="card-container">
            <br></br>
            {
                Array.isArray(products) && products.length > 0 ? (
                        products.map((data, index) =>
                        <div key={index} className="card text-bg-light mb-3" style={cardStyle}>
                                <div className="card-header">{data.name}</div>
                                <div className="card-body">
                                    <h6 className="card-title">
                                        Name: { }
                                        {
                                            editingProduct === data.guid ? (
                                                <InputUpdate
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => handleInputChange(data.guid, 'name', e.target.value)}
                                                />
                                            ) : (
                                                data.name
                                            )
                                        }
                                </h6>
                                    <h6 className="card-text">
                                        Supplier: { }
                                        {
                                            editingProduct === data.guid ? (
                                                <Select
                                                    name="supplierGuid"
                                                    value={data.supplierGuid}
                                                    onChange={(e) => handleInputChange(data.guid, 'supplierGuid', e.target.value)}
                                                    options={suppliers}
                                                />
                                            ) : (
                                                (suppliers.find((supplier) => supplier.guid === data.supplierGuid) || {}).name
                                            )
                                        }
                                </h6>
                                <h6 className="card-text">
                                        Category: { }
                                        {
                                             editingProduct === data.guid ? (
                                                <Select
                                                    name="categoryGuid"
                                                    value={data.categoryGuid}
                                                    onChange={(e) => handleInputChange(data.guid, 'categoryGuid', e.target.value)}
                                                    options={categories.filter((category) => category.supplierGuid === data.supplierGuid)}
                                                />
                                            ) : (
                                                (categories.find((category) => category.guid === data.categoryGuid) || {}).name
                                            )
                                        }
                                </h6>
                                <h6 className="card-text">
                                        Stock: { }
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
                                </h6>
                                <h6 className="card-text">
                                        Price: { }
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
                                </h6>
                                <h6 className="card-text">
                                        Description: { }
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
                                </h6>
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
                                                        handleCategoryEdit(data.guid)
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
                            </div>
                        </div>
                    )
                ) : (
                    <h5>No product available.</h5>
                )
            }     
        </div>
    )
}