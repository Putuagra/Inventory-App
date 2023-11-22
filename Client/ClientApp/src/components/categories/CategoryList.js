import React, { useState } from 'react'
import Button from '../Button'
import InputUpdate from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import DeleteAlert from '../DeleteAlert'
import { ValidateData, ValidationDuplicate } from '../../Validation/Categories/CategoryValidation'

export default function CategoryList({ categories, suppliers, editingCategory, handleEdit, handleInputChange, handleUpdate, handleDelete, handleDuplicate }) {

    const [category, setCategory] = useState('')

    const handleCategoryEdit = (guid) => {
        const categoryToEdit = categories.find((category) => category.guid === guid)
        setCategory(categoryToEdit.name)
    }

    const handleUpdateCategory = async (data) => {
        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleDuplicate(data.name, data.supplierGuid)
        const validationDuplicateResult = ValidationDuplicate(data, status, category)

        if (validationDuplicateResult) {
            ErrorAlert({ message: validationDuplicateResult })
            return
        } else {
            if (status === 404 || category === data.name) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update category successful.' })
                } catch (error) {
                    console.error('Error during update:', error)
                    ErrorAlert({ message: 'Failed to update category. Please try again later.' })
                }
            } 
        }  
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Supplier</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((data, index) => (
                        <tr key={index}>
                            <td>
                                {editingCategory === data.guid ? (
                                    <InputUpdate
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => handleInputChange(data.guid, 'name', e.target.value)}
                                    />
                                ) : (
                                    data.name
                                )}
                            </td>
                            <td>
                                {editingCategory === data.guid ? (
                                    <Select
                                        name="supplierGuid"
                                        value={data.supplierGuid || ''}
                                        onChange={(e) => handleInputChange(data.guid, 'supplierGuid', e.target.value)}
                                        options={suppliers}
                                    />
                                ) : (
                                    (suppliers.find((supplier) => supplier.guid === data.supplierGuid) || {}).name
                                )}
                            </td>
                            <td>
                                {editingCategory === data.guid ? (
                                    <Button
                                        name="Save"
                                        className="btn btn-success"
                                        onClick={() => handleUpdateCategory(data)}
                                    />
                                ) : (
                                        <>
                                            <Button
                                                name="Edit"
                                                className="btn btn-primary"
                                                onClick={() => {
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
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No category available.</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}