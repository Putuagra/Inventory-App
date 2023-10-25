import React, { useState } from 'react'
import Button from '../Button'
import InputUpdate from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

export default function CategoryList({ categories, suppliers, editingCategory, handleEdit, handleInputChange, handleUpdate, handleDelete, handleDuplicate }) {

    const [category, setCategory] = useState('')

    const handleCategoryEdit = (guid) => {
        const categoryToEdit = categories.find((category) => category.guid === guid)
        setCategory(categoryToEdit.name)
    }

    const handleUpdateCategory = async (data) => {
        const namePattern = /^[a-zA-Z0-9\s]+$/

        if (data.name === '' && data.supplierGuid === '') {
            ErrorAlert({ message: 'Semua field harus diisi.' })
            return
        }

        if (data.name === '') {
            ErrorAlert({ message: 'Nama harus diisi.' })
            return
        } else if (!namePattern.test(data.name)) {
            ErrorAlert({ message: 'Invalid format name.' })
            return
        }

        if (data.supplierGuid === '') {
            ErrorAlert({ message: 'Supplier harus diisi.' })
            return
        }

        const status = await handleDuplicate(data.name, data.supplierGuid)

        if (status === 200 && category !== data.name) {
            ErrorAlert({ message: 'Category name already exists in this supplier.' })
            return
        }

        if (status === 404  || category === data.name) {
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Update category successful.' })
            } catch (error) {
                console.error('Error during update:', error)
                ErrorAlert({ message: 'Failed to update category. Please try again later.' })
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
                                        label="Supplier"
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
                                                onClick={() => handleDelete(data.guid)}
                                            />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No user data available.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}