import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';

export default function CategoryForm({ handleCreate,suppliers }) {
    const [newCategory, setNewCategory] = useState({ name: '', supplierGuid: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleCreate(newCategory);
                        setNewCategory({ name: '', supplierGuid: '' });
                    }}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Category Name"
                        value={newCategory.name}
                        onChange={handleChange}
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