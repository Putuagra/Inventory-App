import React, { useState } from 'react';

export default function CategoryForm({ handleCreate,suppliers }) {
    const [newCategory, setNewCategory] = useState({ name: '', supplierGuid: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={newCategory.name}
                onChange={handleChange}
            />
            <select
                name="supplierGuid"
                value={newCategory.supplierGuid}
                onChange={handleChange}
            >
                <option value="">Pilih Supplier</option> 
                {suppliers.map((supplier) => (
                    <option key={supplier.guid} value={supplier.guid}>
                        {supplier.name} 
                    </option>
                ))}
            </select>
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    handleCreate(newCategory);
                    setNewCategory({ name: '', supplierGuid: '' });
                }}
            >
                Add Category
            </button>
        </div>
    );
}