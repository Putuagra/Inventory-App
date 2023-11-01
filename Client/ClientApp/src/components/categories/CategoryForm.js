import React, { useState } from 'react'
import { CategoryValidation, ValidateData } from '../../Validation/Categories/CategoryValidation'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

export default function CategoryForm({ handleCreate, suppliers, handleDuplicate }) {
    const [newCategory, setNewCategory] = useState({ name: '', supplierGuid: '' })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewCategory({ ...newCategory, [name]: value })
    }

    const handleCreateCategory = async () => {
        const validationError = ValidateData(newCategory)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleDuplicate(newCategory.name, newCategory.supplierGuid)
        if (status === 200) {
            ErrorAlert({ message: 'Supplier categories already exists.' })
            return
        }

        try {
            await handleCreate(newCategory)
            setNewCategory({ name: '', supplierGuid: '' })
            SuccessAlert({ message: 'Add category successful.' })
        } catch (error) {
            console.error('Error during add:', error);
            ErrorAlert({ message: 'Failed to add category. Please try again later.' })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(CategoryValidation(newCategory))
        handleCreateCategory()
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <h1>Add Category</h1>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={handleChange}
                        errors={errors.name}
                    />
                    <Select
                        name="supplierGuid"
                        label="Supplier"
                        value={newCategory.supplierGuid}
                        onChange={handleChange}
                        options={suppliers}
                    />
                    <Button
                        name="Add Category"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    );
}