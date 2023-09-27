import React, { useState } from 'react';

export default function ProductForm({ handleCreate, suppliers, categories }) {
    const [newProduct, setNewProduct] = useState({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleSupplierChange = (e) => {
        const selectedSupplierGuid = e.target.value;
        setNewProduct({
            ...newProduct,
            supplierGuid: selectedSupplierGuid,
            categoryGuid: '',
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
            />
            <select
                name="supplierGuid"
                value={newProduct.supplierGuid}
                onChange={handleSupplierChange}
            >
                <option value="">Select Supplier</option>
                {suppliers.map((supplier) => (
                    <option key={supplier.guid} value={supplier.guid}>
                        {supplier.name}
                    </option>
                ))}
            </select>
            <select
                name="categoryGuid"
                value={newProduct.categoryGuid}
                onChange={handleChange}
            >
                <option value="">Select Category</option>
                {
                    categories.filter((category) => category.supplierGuid === newProduct.supplierGuid)
                        .map((category) => (
                            <option key={category.guid} value={category.guid}>
                                {category.name}
                            </option>
                        ))
                }
            </select>
            <input
                type="text"
                placeholder="Stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Description"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    handleCreate(newProduct);
                    setNewProduct({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' });
                }}
            >
                Add Product
            </button>
        </div>
    )
}