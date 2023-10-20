import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import axios from "axios";
import CategoryValidation from '../../Validation/CategoryValidation';

export default function CategoryForm({ handleCreate,suppliers }) {
    const [newCategory, setNewCategory] = useState({ name: '', supplierGuid: '' });
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleCreateCategory = async () => {
        const namePattern = /^[a-zA-Z0-9\s]+$/
        const apiUrl = 'https://localhost:7020/api'

        if (!newCategory.name || !newCategory.supplierGuid) {
            return;
        }

        if (!namePattern.test(newCategory.name)) {
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/Category/CheckDuplicate/${newCategory.name}/${newCategory.supplierGuid}`);

            if (response.status === 200) {
                alert('Category Name already exists.');
                return;
            }
        } catch {
            console.log('Something went wrong with the category response.');
        }

        handleCreate(newCategory);
        setNewCategory({ name: '', supplierGuid: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(CategoryValidation(newCategory))
        handleCreateCategory()
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
                    />
                </form>
            </div>
        </div>
    );
}